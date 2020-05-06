<template>
  <div>
    <q-page>
      <transition
        appear
        enter-active-class="animated infinite fadeIn slow"
        leave-active-class="animated infinite fadeOut slow"
        :duration="{enter: 200, leave: 100}"
      >
        <keep-alive>
        <component :is="page"></component>
        </keep-alive>
      </transition>
    </q-page>
  </div>
</template>

<script>
import MemberList from "../components/admin/MemberList";
import ProjectsOfMember from "../components/admin/ProjectsOfMember";
import AddClub from "../components/admin/AddClub";
import AddList from "../components/admin/ManageActivity";
import AddCal from "../components/admin/Calendar";

export default {
  components: {
    list: MemberList,
    project: ProjectsOfMember,
    addClub: AddClub,
    addList: AddList,
    addCal: AddCal
  },
  computed: {
    page: {
      get() {
        return this.$store.state.dashboardPage;
      },
      set(page) {
        this.$store.commit("SET_DASHBOARD_PAGE", page);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>