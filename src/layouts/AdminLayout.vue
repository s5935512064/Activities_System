<template>
  <q-layout view="lHh Lpr lFf" class="q-ma-xs bg-grey-2">
      <q-header elevated class="bg-white">
      <div class="row justify-end bg-blue-10">
        <q-btn class="q-ma-sm"
          v-if="user"
          flat
          dense
          round
          @click="drawer = !drawer"
          icon="menu"
          aria-label="Menu"
        />
         <q-toolbar-title class="q-ma-sm q-ml-lg">
          <div class="text-h6">ระบบจัดการโครงการและบันทึกชั่วโมงกิจกรรมนักศึกษา <span class="text-subtitle1"> ( มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต )</span></div>
        </q-toolbar-title>

            <!-- <q-btn flat label="เปลี่ยนภาษา" icon="language"/>  -->
      </div>
      <q-toolbar class="text-dark">
      <div>
        <img class="q-mx-sm GPLAY__logo" src="https://i.imgur.com/vKDCndF.png">
      </div>  
      <q-space></q-space>
      <q-btn v-if="!user" flat text-color="dark" label="หน้าแรก" @click="toHome" />
        <q-btn v-if="!user" flat text-color="dark" label="ปฎิทินกิจกรรม" />
        <q-btn v-if="!user" flat text-color="dark" label="หลักสูตรชั่วโมงกิจกรรม"  />
        <q-btn v-if="!user" color="primary glossy" text-color="white" style="width:150px;" label="ลงชื่อเข้าใช้งาน" @click="toLogin" />
        <q-btn v-if="user" color="primary glossy" text-color="white" style="width:150px;" label="ออกจากระบบ" @click="logout" />  
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" bordered content-class="bg-grey-1">
      <q-list style="margin-top: 150px;">
        <q-item-label header class="text-center">
          <div class="text-h6">รายการ</div>
          <q-separator spaced />
        </q-item-label>
        <q-item clickable tag="a" @click="toProjectList">
          <q-item-section avatar>
            <q-icon name="arrow_right" />
          </q-item-section>
          <q-item-section>
            <q-item-label>โครงการทั้งหมด</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="toAddClub">
          <q-item-section avatar>
            <q-icon name="arrow_right" />
          </q-item-section>
          <q-item-section>
            <q-item-label>เพิ่มชมรม</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <div class="text-weight-bold">{{userEmail}}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Login from "../components/Login";

export default {
  name: "AdminLayout",
  components: {
    Login
  },
  data() {
    return {
      leftDrawerOpen: false,
      loginD: this.$q
        .dialog({
          component: Login,
          parent: this
        })
        .onOk(() => {})
        .onCancel(() => {})
        .onDismiss(() => {
          if (!this.user) {
            this.$router.push(`/`);
          }
        })
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userEmail() {
      return this.$store.getters.user
        ? this.$store.getters.user.email.toUpperCase()
        : undefined;
    },
    page: {
      get() {
        return this.$store.state.dashboardPage;
      },
      set(page) {
        this.$store.commit("SET_DASHBOARD_PAGE", page);
      }
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(`logout`);
    },
    toLogin() {
      this.$q.dialog({
        component: Login,
        parent: this
      });
    },
    toHome() {
      this.$router.push(`/admin`);
    },
    toProjectList() {
      this.page = `list`;
      this.$router.push(`/admin`);
    },
    toAddClub() {
      this.page = `addClub`;
      this.$router.push(`/admin`);
    }
  },
  mounted() {
    if (this.user) {
      this.loginD.hide();
    }
  },
  watch: {
    user(user) {
      if (user) {
        this.loginD.hide();
      }
    }
  }
};
</script>
