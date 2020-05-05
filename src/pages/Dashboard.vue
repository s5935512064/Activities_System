<template>
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
</template>

<script>
import SubmitProject from "../components/dashboards/SubmitProject/Index";
import ProjectList from "../components/dashboards/ProjectList/Index";
export default {
  components: {
    submit: SubmitProject,
    list: ProjectList
  },
  data() {
    return {
      slide: 1
    };
  },
  computed: {
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
  mounted() {
    this.drawer = true;
  },
  beforeMount() {
    this.page = `list`;
  }
};
</script>

<style lang="scss" scoped>
</style>