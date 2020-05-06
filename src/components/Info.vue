<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card class="my-card" flat>
      <q-img
        src="https://t2.tudocdn.net/510706?w=646&h=284"
        style="max-width: 646px; height: 250px;"
        
      />

      <q-card-section>
        <div class="text-overline text-orange-9">Overline</div>
        <div class="text-h4 text-weight-bold q-mt-sm q-mb-xs">Github Link for Project</div>
        <div class="text-caption text-grey">
          Created by Mr.Natthawut Thippasoet <br/>
            Department of Computer Engineering <br/> 
            Prince of Songkla University, Phuket Campus <br/>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Go to Link" type="a" href="https://github.com/s5935512064/Activities_System.git"/>

        <q-space />

      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      offset: 24
    };
  },
  methods: {

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