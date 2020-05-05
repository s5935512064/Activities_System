<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pt-md">
      <q-card class="offset header-bg" :style="styles">
        <q-card-section>
          <div class="text-h6 text-center">ลงชื่อเข้าใช้งาน</div>
        </q-card-section>
      </q-card>
      <q-card-section>
        <div class="q-mb-lg q-mt-lg">
          <q-input outlined v-model="email" type="text" label="อีเมล์" :rules="[emailValidate]">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
        <div class="q-mb-lg">
          <q-input outlined v-model="password" type="password" label="รหัสผ่าน">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="q-mb-lg">
          <q-btn size="lg" color="primary" label="ลงชื่อเข้าใช้งาน" @click="login" />
        </div>
        <div class="q-mb-md">
          <hr />
        </div>
        <div class="row">
          <div class="col">
            <div class="text-right">
              ลืมรหัสผ่านโปรดติดต่อ
              <a href="#">องค์การนักศึกษา?</a>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: ``,
      password: ``,
      offset: 24
    };
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        this.hide();
        await this.$store.dispatch(`login`, {
          email: this.email,
          password: this.password
        });
      }
    },
    toSignUp() {
      this.$router.push(`/signup`);
    },
    emailValidate(val) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = re.test(val);
      if (valid) {
        return true;
      } else {
        return `อีเมล์เท่านั้น`;
      }
    },
    show() {
      this.$refs.dialog.show();
    },

    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      this.$emit("hide");
    },

    onOKClick() {
      this.$emit("ok");
      this.hide();
    },

    onCancelClick() {
      this.hide();
    }
  },
  computed: {
    styles() {
      return {
        // top: `-${this.offset}px`,
        // marginBottom: `-${this.offset}px`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.offset {
  margin: 0 auto;
  max-width: calc(100% - 32px);
  position: relative;
}

.offset--full-width {
  max-width: 100%;
}

.header-bg {
  background-image: linear-gradient(to right, pink, rgb(113, 204, 247));
}
</style>