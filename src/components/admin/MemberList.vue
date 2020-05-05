<template>
  <div class="row">
    <div class="col-xs-12 col-md-4 offset-md-8 q-px-md q-pt-md">
      <q-input outlined bottom-slots v-model="search">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search =''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-12 q-px-md" v-if="user">
      <q-table @row-click="toProject" title="ชมรม" :data="data" :columns="columns" row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props" @click="toProject(props.row)">
            <q-td key="club" :props="props">{{ props.row.club }}</q-td>
            <q-td key="pending" :props="props">{{ pendingCount(props.row.projects) }}</q-td>
            <q-td key="approved" :props="props">{{ approvedCount(props.row.projects) }}</q-td>
            <q-td key="rejected" :props="props">{{ rejectedCount(props.row.projects) }}</q-td>
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
          name: "club",
          align: "left",
          label: "ชมรม",
          field: "club",
          sortable: true
        },
        {
          name: "pending",
          align: "left",
          label: "รอการตรวจสอบ",
          field: "pending",
          sortable: true
        },
        {
          name: "approved",
          align: "left",
          label: "อนุมัติแล้ว",
          field: "approved",
          sortable: true
        },
        {
          name: "rejected",
          align: "left",
          label: "ไม่ผ่านการอนุมัติ",
          field: "rejected",
          sortable: true
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
        return this.$store.memberId;
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
      .get();
    snapshot.forEach(doc => {
      if (doc.data().club == `admin`) {
        return;
      }
      this.data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    this.$q.loading.hide();
  },
  methods: {
    toProject(row) {
      this.memberId = row.id;
      this.page = `project`;
    },
    pendingCount(projects) {
      return projects
        ? projects.filter(p => p.status == `รอการตรวจสอบ`).length
        : 0;
    },
    approvedCount(projects) {
      return projects
        ? projects.filter(p => p.status == `อนุมัติแล้ว`).length
        : 0;
    },
    rejectedCount(projects) {
      return projects
        ? projects.filter(p => p.status == `ไม่อนุมัติ`).length
        : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>