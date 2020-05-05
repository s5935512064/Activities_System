<template>
  <div class="row">
    <div class="col-xs-12 col-md-4 q-px-md q-pt-md">
      <q-btn class="q-mt-sm" color="primary" label="ย้อนกลับ" @click="backToMembers" />
    </div>
    <div class="col-xs-12 col-md-4 offset-md-4 q-px-md q-pt-md">
      <q-input outlined bottom-slots v-model="search">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-12 q-px-md" v-if="user">
      <q-table
        title="โครงการ"
        :data="data"
        :columns="columns"
        row-key="id"
        no-data-label="ไม่มีโครงการที่เสนอ"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="props.expand = !props.expand">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="projectName" :props="props">{{ props.row.projectName }}</q-td>
            <q-td key="status" :props="props">{{ props.row.status }}</q-td>
            <q-td key="file" :props="props">
              <q-btn color="primary" label="ดูไฟล์" @click="viewFile(props.row.file)" />
            </q-td>
            <q-td key="update" :props="props">
              <q-icon :name="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" size="lg" />
            </q-td>
          </q-tr>
          <!----------------------------- span ----------------------------->
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="row">
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">รหัสโครงการ: {{ props.row.id }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >ชื่อโครงการ: {{ props.row.projectName }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >หมวดงบประมาณ: {{ props.row.budgetType }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">จำนวนเงิน: {{ props.row.amount }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >วันที่เริ่มโครงการ: {{ props.row.startDate }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >วันที่สิ้นสุดโครงการ: {{ props.row.stopDate }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">สถานที่: {{ props.row.area }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >หมายเลขหนังสือ: {{ props.row.bookNumber }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >ผู้รับผิดชอบตำแหน่ง: {{ props.row.submitter }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">เบอร์โทรติดต่อ: {{ props.row.tel }}</div>
              </div>
              <div class="row">
                <div class="col q-px-lg offset-md-6">
                  <q-btn color="green" label="อนุมัติ" @click="approve(props.row)" class="q-mr-lg" />
                  <q-btn color="red" label="ไม่อนุมัติ" @click="reject(props.row)" class="q-mr-lg" />
                  <q-btn color="primary" label="รอการตวจสอบ" @click="pending(props.row)" />
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { QSpinnerGears } from "quasar";

export default {
  data() {
    return {
      columns: [
        {
          name: "id",
          align: "left",
          label: "รหัสโครงการ",
          field: "id",
          sortable: true
        },
        {
          name: "projectName",
          align: "left",
          label: "ชื่อโครงการ",
          field: "projectName",
          sortable: true
        },
        {
          name: "status",
          align: "left",
          label: "สถานะ",
          field: "status",
          sortable: true
        },
        {
          name: "file",
          align: "center",
          label: "ไฟล์",
          field: "file",
          sortable: true
        },
        {
          name: "update",
          align: "right",
          sortable: false
        }
      ],
      data: [],
      search: ``
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    page: {
      get() {
        return this.$store.state.dashboardPage;
      },
      set(page) {
        this.$store.commit("SET_DASHBOARD_PAGE", page);
      }
    },
    memberId: {
      get() {
        return this.$store.state.memberId;
      },
      set(val) {
        this.$store.commit(`SET_MEMBER_ID`, val);
      }
    }
  },
  async mounted() {
    this.$q.loading.show({
      spinner: QSpinnerGears
    });
    const snapshot = await firebase
      .firestore()
      .collection(`projects`)
      .doc(this.memberId)
      .get();
    this.data = snapshot.data().projects;
    this.$q.loading.hide();
  },
  methods: {
    backToMembers() {
       this.$q.loading.show({
      spinner: QSpinnerGears
    });
    // const snapshot = await firebase
    //   .firestore()
    //   .collection(`projects`)
    //   .doc(this.memberId)
    //   .get();
    this.data = snapshot.data().projects;
    this.$q.loading.hide();
    this.page = `list`;  
    },
    viewFile(url) {
      window.open(url);
    },
    async approve(project) {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.data[this.data.indexOf(project)].status = `อนุมัติแล้ว`;
      this.data[this.data.indexOf(project)].reason = ``;
      await firebase
        .firestore()
        .collection(`projects`)
        .doc(this.memberId)
        .update({
          projects: this.data
        });
      this.$q.loading.hide();
    },
    async reject(project) {
      this.$q
        .dialog({
          title: `เหตุผล`,
          message: `เหตุผลที่ไม่อนุมัติ`,
          prompt: {
            model: "",
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(async reason => {
          this.$q.loading.show({
            spinner: QSpinnerGears
          });
          this.data[this.data.indexOf(project)].status = `ไม่อนุมัติ`;
          this.data[this.data.indexOf(project)].reason = reason;
          await firebase
            .firestore()
            .collection(`projects`)
            .doc(this.memberId)
            .update({
              projects: this.data
            });
          this.$q.loading.hide();
        });
    },
    async pending(project) {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.data[this.data.indexOf(project)].status = `รอการตรวจสอบ`;
      this.data[this.data.indexOf(project)].reason = ``;
      await firebase
        .firestore()
        .collection(`projects`)
        .doc(this.memberId)
        .update({
          projects: this.data
        });
      this.$q.loading.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>