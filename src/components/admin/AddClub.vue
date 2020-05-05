<template>
  <div class="q-pa-xl row">
    <div class="q-pa-md text-h4">เพิ่มชมรม</div>
    <div class="q-pa-md col-12">
      <q-input outlined v-model="email" type="text" label="อีเมล์" :rules="[emailValidate]" />
    </div>
    <div class="q-pa-md col-12">
      <q-input outlined v-model="password" type="text" label="รหัสผ่าน" />
    </div>
    <div class="q-pa-md col-12">
      <q-input outlined v-model="club" type="text" label="ชมรม" />
    </div>
    <div class="q-pa-md col-xs-12 col-md-4 offset-md-8">
      <q-btn size="lg" color="green" label="เพิ่ม" @click="submit" style="width:100%" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { QSpinnerGears } from "quasar";

export default {
  data() {
    return {
      email: ``,
      password: ``,
      club: ``
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const docRef = await firebase
          .firestore()
          .collection(`projects`)
          .doc(this.email)
          .get();
        if (docRef.exists) {
          await firebase
            .firestore()
            .collection(`projects`)
            .doc(this.email)
            .update({
              club: this.club
            });
        } else {
          await firebase
            .firestore()
            .collection(`projects`)
            .doc(this.email)
            .set({
              club: this.club,
              projects: []
            });
        }
        this.$q.loading.hide();
      } catch (error) {
        const message =
          error.code == `auth/email-already-in-use`
            ? `อีเมล์ถูกใช้ไปแล้ว`
            : `เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ`;
        this.$q.loading.hide();
        this.$q.dialog({
          title: `เกิดข้อผิดพลาด`,
          message
        });
      }
    },
    emailValidate(val) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = re.test(val);
      if (valid) {
        return true;
      } else {
        return `อีเมล์เท่านั้น`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>