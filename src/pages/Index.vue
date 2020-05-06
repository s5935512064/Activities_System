<template>
  <q-page class="q-ma-xs">
    <div class="row">
      <div class="col-12">
        <q-carousel
          animated
          v-model="slide"
          :autoplay="2500"
          infinite
          keep-alive
          arrows
          :height="`${this.$q.screen.height}px`"
          navigation
          navigation-icon="radio_button_unchecked"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://scontent.furt3-1.fna.fbcdn.net/v/t1.0-9/84649846_2247570162010502_7198022179122839552_o.jpg?_nc_cat=101&_nc_sid=a61e81&_nc_oc=AQk9fLWDYE6yNq4k2qnLsTGB7eTexAgOAengMmd0D6FPTj3khdBfLilBXrYLNV-53mQ&_nc_ht=scontent.furt3-1.fna&oh=6379a8c13def9b33965e631e86e27cb3&oe=5EF6E6E0"
          />
          <q-carousel-slide
            :name="2"
            img-src="http://www.psupix.com/wp-content/uploads/2020/02/IMG_8903.jpg"
          />
          <q-carousel-slide
            :name="3"
            img-src="https://scontent.furt3-1.fna.fbcdn.net/v/t1.0-9/81189619_3074369756121754_6196279632094822400_o.jpg?_nc_cat=111&_nc_sid=a61e81&_nc_oc=AQmdU345PXx-NpZ_vucphK6uIuFDGHhxOCqMv4WZKvoMNFb4Y3EIljbd8y1zWJ15_9w&_nc_ht=scontent.furt3-1.fna&oh=1147f0e95a014f5bb7764b0ee742fa35&oe=5EFB04DC"
          />
          <q-carousel-slide
            :name="4"
            img-src="https://scontent.furt3-1.fna.fbcdn.net/v/t1.0-9/80884440_3074369746121755_1560769155198615552_o.jpg?_nc_cat=111&_nc_sid=a61e81&_nc_oc=AQl2fe2kVF4erM7d19FWbqiqHf2ZWTTgNWOCg3SoM7vK72NM14LPLDzGA2nWX0q04UY&_nc_ht=scontent.furt3-1.fna&oh=628b13331e45f8b5eb2d671953e9db90&oe=5EC25819"
          />
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import Login from "../components/Login";
import Info from "../components/Info";
import { animateCSS } from "../utils/animation";

export default {
  name: "PageIndex",
  components: {
    Login,
    Info
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
    toInfo() {
      this.$router.push(`/Info`);
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
