<template>
  <div class="row">
    <div class="col-xs-12 col-md-4 offset-md-8 q-px-md q-pt-md">
      <q-input outlined bottom-slots v-model="search">
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-12 q-px-md">
      <q-table
        title="โครงการที่เสนอ"
        :data="data"
        :columns="columns"
        row-key="id"
        no-data-label="ไม่มีโครงการที่เสนอ"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "รหัสโครงการ",
          align: "center",
          field: `id`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "projectName",
          align: "center",
          label: "ชื่อโครงการ",
          field: "projectName",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "สถานะ",
          field: "status",
          sortable: true
        },
        {
          name: "reason",
          align: "center",
          label: "หมายเหตุ",
          field: "reason",
          sortable: true
        }
      ]
    };
  },
  computed: {
    data() {
      return this.search
        ? this.$store.getters.projectByName(this.search)
        : this.$store.state.projectsOfUser;
    },
    search: {
      get() {
        return this.$store.state.searchProject;
      },
      set(val) {
        this.$store.commit(`SET_SEARCH_PROJECT`, val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>