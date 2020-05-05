<template>
  <q-layout view="lHh LpR lFf" class="q-ma-xs bg-grey-2">
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
            <q-btn flat label="เกี่ยวกับ" icon="info"/>
            <q-btn flat label="ติดต่อเรา" icon="phone"/>
            <q-btn flat label="เปลี่ยนภาษา" icon="language"/> 
      </div>
      <q-toolbar class="text-dark">
      <div>
        <img class="q-mx-sm GPLAY__logo" src="https://i.imgur.com/vKDCndF.png">
      </div>  
      <q-space></q-space>
        <q-btn flat text-color="dark" label="หน้าแรก" @click="toHome" />
        <q-btn flat text-color="dark" label="ปฎิทินกิจกรรม" @click="toCal" />
        <q-btn flat text-color="dark" label="หลักสูตรชั่วโมงกิจกรรม"  />
        <q-btn v-if="!user" color="primary glossy" text-color="white" style="width:150px;" label="ลงชื่อเข้าใช้งาน" @click="toLogin" />
        <q-btn v-if="user" color="primary glossy" text-color="white" style="width:150px;" label="ออกจากระบบ" @click="logout" />  
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" bordered content-class="bg-grey-1">
      <q-list style="margin-top: 150px;">
        <q-item-label header class="text-center">
          <!-- <div class="text-h6">{{user}}</div>
          <q-separator spaced />-->
          <div class="text-h6">รายการ</div>
          <q-separator spaced />
        </q-item-label>
        <q-item clickable tag="a" @click="toHome">
          <q-item-section avatar>
            <q-icon name="arrow_right" />
          </q-item-section>
          <q-item-section>
            <q-item-label>หน้าหลัก</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="toProjectList">
          <q-item-section avatar>
            <q-icon name="arrow_right" />
          </q-item-section>
          <q-item-section>
            <q-item-label>โครงการที่เสนอ</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" @click="toSubmitProject">
          <q-item-section avatar>
            <q-icon name="arrow_right" />
          </q-item-section>
          <q-item-section>
            <q-item-label>เสนอโครงการ</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <!-- <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>-->
          <div class="text-weight-bold">{{user}}</div>
          <!-- <div>@rstoenescu</div> -->
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
  name: "MyLayout",
  components: {
    Login
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user
        ? this.$store.getters.user.email.toUpperCase()
        : this.$store.getters.user;
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
    async logout() {
      await this.$store.dispatch(`logout`);
    },
    toLogin() {
      this.$q.dialog({
        component: Login,
        parent: this
      });
    },
    toCal() {
      this.$router.push(`/calendar`);
    },
    toHome() {
      this.$router.push("/");
    },
    toProjectList() {
      this.page = `list`;
      this.$router.push(`/dashboard`);
    },
    toSubmitProject() {
      this.page = `submit`;
      this.$router.push(`/dashboard`);
    }
  }
};
</script>

<style lang="sass">
.GPLAY
  &__logo
    height: 80px
</style>