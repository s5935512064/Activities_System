<template>
  <div class="row">
    <div class="col-xs-12 col-md-4 offset-md-8 q-px-md q-pt-md">
      <q-input outlined bottom-slots v-model="search">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-12 q-px-md">
      <q-table
        title="จัดการกิจกรรม"
        :data="data"
        :columns="columns"
        row-key="id"
        no-data-label="ไม่มีโครงการที่เสนอ"
      >
      <template v-slot:body="props">
          <q-tr :props="props" @click="props.expand = !props.expand">
            <q-td key="startDate" :props="props">{{ props.row.startDate }}</q-td>
            <q-td key="typeOfActivity" :props="props">{{ props.row.typeOfActivity }}</q-td>
            <q-td key="projectName" :props="props">{{ props.row.projectName }}</q-td>
            <q-td key="status" :props="props">{{ props.row.status }}</q-td>
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
                >จำนวนคนที่รับสมัคร: {{ props.row.amountPeople }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">หมวดกิจกรรม: {{ props.row.typeOfhour }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">ประเภทกิจกรรม: {{ props.row.typeOfActivity }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">จำนวนชั่วโมง: {{ props.row.hour }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >วันที่เริ่มโครงการ: {{ props.row.startDate }}</div>
                <div
                  class="q-py-xs q-pl-lg col-md-6 text-h6"
                >วันที่สิ้นสุดโครงการ: {{ props.row.stopDate }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">สถานที่: {{ props.row.area }}</div>
                <div class="q-py-xs q-pl-lg col-md-6 text-h6">เบอร์โทรติดต่อ: {{ props.row.tel }}</div>
              </div>
              <div class="row">
                <div class="col q-px-lg offset-md-6">
                  <q-btn color="green" label="เผยแพร่" @click="approve(props.row)" class="q-mr-lg" />
                  <!-- <q-btn color="red" label="ไม่อนุมัติ" @click="reject(props.row)" class="q-mr-lg" /> -->
                  <q-btn color="primary" label="รอการตรวจสอบ" @click="pending(props.row)" />
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
          name: "startDate",
          label: "วันที่เริ่มกิจกรรม",
          align: "center",
          field: `startDate`,
          // format: val => `${val}`,
          sortable: true
        },

        {
          name: "typeOfActivity",
          label: "ประเภทกิจกรรม",
          align: "left",
          field: `typeOfActivity`,
          format: val => `${val}`,
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
          align: "center",
          label: "สถานะ",
          field: "status",
          sortable: true
        }
      ],
        // data: [],
        search: ``
    };
  },
  computed: {
   data() {
      return this.search
        ? this.$store.getters.projectByName(this.search)
        : this.$store.state.projectsOfUser;
    },
    search: {
      get() {
        return this.$store.state.searchProject;
      },
      set(val) {
        this.$store.commit(`SET_SEARCH_PROJECT`, val);
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
      .doc('kkte92665@gmail.com')
      .get();
    this.data = snapshot.data().projects;
    this.$q.loading.hide();
  },
  methods: {
     async approve(project) {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      this.data[this.data.indexOf(project)].status = `เผยแพร่แล้ว`;
      this.data[this.data.indexOf(project)].reason = ``;
      await firebase
        .firestore()
        .collection(`projects`)
        .doc('kkte92665@gmail.com')
        .update({
          projects: this.data
        });
      this.$q.loading.hide();
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
        .doc('kkte92665@gmail.com')
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