<template>
    <div>
            <div class="text h2">My Activity in this year</div>
    </div>
</template>

<script>
import Login from "../components/Login";
import { animateCSS } from "../utils/animation";

export default {
  name: "PageIndex",
  components: {
    Login
  },
  data() {
    return {
      slide: 1,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      offset: 70
    };
  },
  methods: {
    toLogin() {
      this.$router.push(`/login`);
    },
    toCal() {
      this.$router.push(`/calendar`);
    },
    toSignUp() {
      this.$router.push(`/signup`);
    },
    toDashboard() {
      if (!this.user) {
        this.$q.dialog({
          component: Login,
          parent: this
        });
      }
      this.user && this.$router.push(`/dashboard`);
    }
  },
  computed: {
    submitProjectButtonStyles() {
      const buttonWidth = 320;
      return {
        top: `-${this.offset}px`,
        marginBottom: `-${this.offset}px`,
        width: `${buttonWidth}px`,
        margin: `0 auto auto ${(this.$q.screen.width - buttonWidth) / 2}px`,
        "animation-duration": `2.0s`
      };
    },
    headerClasses() {
      const textDisplay = this.$q.screen.lt.sm ? `text-h4` : `text-h2`;
      return `${textDisplay} text-center`;
    },
    user() {
      return this.$store.getters.user
        ? this.$store.getters.user.email.toUpperCase()
        : this.$store.getters.user;
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
    this.drawer = false;
    animateCSS(`#headerBtn`, `shake`, () => {});
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 360px
  margin: 0 auto;
</style>