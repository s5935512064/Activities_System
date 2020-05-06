<template>
  <div class="row q-pa-md">
    <div class="col-12 q-pa-md">
      <q-uploader
        url="http://localhost:4444/upload"
        style="width: 100%; height: 200px"
        label="อัพโหลดภาพกิจกรรม"
        square
        :send-raw="true"
        accept=".png"
        @added="fileAdded"
      />
    </div>
    <!-- <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="bookNumber"
        :rules="requiredFieldRule"
        label="เลขที่หนังสือ"
        hint="เลขที่หนังสือ"
      />
    </div> -->
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="projectName"
        :rules="requiredFieldRule"
        label="ชื่อโครงการ"
        hint="ชื่อโครงการ"
      />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input outlined v-model="club" :rules="requiredFieldRule" label="สังกัด" hint="สังกัด" />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="amountPeople"
        :rules="requiredFieldRule"
        label="จำนวนที่รับสมัคร"
        hint="จำนวนที่รับสมัคร"
      />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-select
        outlined
        v-model="typeOfhour"
        :options="[`กิจกรรมบังคับ`, `กิจกรรมเลือกเข้าร่วม`]"
        :rules="requiredFieldRule"
        label="หมวดกิจกรรม"
        hint="หมวดกิจกรรม"
      />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-select
        outlined
        v-model="typeOfActivity"
        :options="[`Y1 เตรียมความพร้อม`,`Y2 เรียนรู้ชุมชน เรียนรู้สังคม`,`Y3 สัมผัสโลกกว้าง`,`Y4 ความพร้อมสู่วัยทำงาน`, `ด้านเสริมสร้างจิตสำนึกสาธารณะ และการบำเพ็ญประโยชน์`,`ด้านเสริมสร้างความซื่อสัตย์มีวินัย คุณธรรม จริยธรรม`,`ด้านเสริมสร้างสติปัญญา ทักษะทางสังคม ทักษะวิชาการ และวิชาชีพ`, `ด้านเสริมสร้างและพัฒนาสุขภาพ และนันทนาการ`, `ด้านส่งเสริมศิลปวัฒนธรรม และศาสนา` ,`ด้านเสริมสร้างความเป็นประชาธิปไตย และความภูมิใจในสถาบัน`, `ด้านส่งเสริมความเป็นนานาชาติ และเสริมสร้างสมรรถนะสากล`]"
        :rules="requiredFieldRule"
        label="หมวดกิจกรรม"
        hint="หมวดกิจกรรม"
      />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="hour"
        :rules="requiredFieldRule"
        label="จำนวนชั่วโมง"
        hint="จำนวนชั่วโมง"
      />
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="startDate"
        mask="date"
        :rules="['date']"
        label="วันที่เริ่มโครงการ"
        hint="วันที่เริ่มโครงการ"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="startDate" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="stopDate"
        mask="date"
        :rules="['date']"
        label="วันที่สิ้นสุดโครงการ"
        hint="วันที่สิ้นสุดโครงการ"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy2" transition-show="scale" transition-hide="scale">
              <q-date v-model="stopDate" @input="() => $refs.qDateProxy2.hide()" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="area"
        :rules="requiredFieldRule"
        label="สถานที่จัดโครงการ"
        hint="สถานที่จัดโครงการ"
      />
    </div>
    
    <div class="col-6 col-sm-6 col-xs-12 col-md-6 col-lg-6 q-pa-md">
      <q-input
        outlined
        v-model="tel"
        :rules="requiredFieldRule"
        label="เบอร์โทรติดต่อ"
        hint="เบอร์โทรติดต่อ"
      />
    </div>
    <div class="col-12">
      <q-separator spaced />
    </div>
    <div class="col-12 q-mt-md">
      <q-btn
        color="primary"
        label="เพิ่มกิจกรรม"
        size="lg"
        push
        style="width: 100%;"
        @click="submit"
      />
    </div>
  </div>
</template>

<script>
import { QUploaderBase, QSpinnerGears } from "quasar";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

export default {
  mixins: [QUploaderBase],
  props: {
    metadata: Object
  },
  data() {
    return {
      files: null,
      // bookNumber: ``,
      projectName: ``,
      club: ``,
      amountPeople: ``,
      typeOfhour: ``,
      typeOfActivity: ``,
      hour: ``,
      // submitter: ``,
      startDate: ``,
      stopDate: ``,
      area: ``,
      // budgetType: ``,
      // amount: ``,
      tel: ``,
      uploadTask: "",
      progressUpload: 0
    };
  },
  computed: {
    requiredFieldRule() {
      return [
        val => !!val || "จำเป็นต้องกรอก"
        //   val => val.length < 2 || 'Please use maximum 1 character',
      ];
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    fileAdded(files) {
      this.files = files;
    },
    submit() {
      if (
        !this.files ||
        // !this.bookNumber ||
        !this.projectName ||
        !this.club ||
        !this.amountPeople ||
        !this.typeOfhour ||
        !this.typeOfActivity ||
        !this.hour ||
        // !this.submitter ||
        !this.startDate ||
        !this.stopDate ||
        !this.area ||
        // !this.budgetType ||
        // !this.amount ||
        !this.tel
      ) {
        this.$q.dialog({
          title: `เกิดข้อผิดพลาด`,
          message: `กรุณากรอกข้อมูลให้ครบถ้วน`
        });
        return;
      }
      this.$q.loading.show({
        spinner: QSpinnerGears
      });
      const file = this.files[0];
      const ref = `media/${file.name}`;
      const uploadTask = firebase
        .storage()
        .ref()
        .child(ref)
        .put(file, this.metadata);
      uploadTask.on(
        "state_changed",
        sp => {
          this.uploadSize = sp.totalBytes;
          this.uploadedSize = sp.bytesTransferred;
        },
        null,
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          this.removeFile(file);
          const project = {
            // bookNumber: this.bookNumber,
            projectName: this.projectName,
            club: this.club,
            amountPeople: this.amountPeople,
            typeOfhour: this.typeOfhour,
            typeOfActivity: this.typeOfActivity,
            hour: this.hour,
            startDate: this.startDate,
            stopDate: this.stopDate,
            area: this.area,
            // budgetType: this.budgetType,
            // amount: this.amount,
            tel: this.tel,
            file: downloadURL
          };
          await this.$store.dispatch(`submitProject`, project);
          this.clearField();
          this.$q.loading.hide();
        }
      );
    },
    clearField() {
      this.files = null;
      // this.bookNumber = ``;
      this.projectName = ``;
      this.club = ``;
      this.amountPeople = ``;
      this.typeOfhour = ``;
      this.typeOfActivity = ``;
      this.hour = ``;
      this.startDate = ``;
      this.stopDate = ``;
      this.area = ``;
      // this.budgetType = ``;
      // this.amount = ``;
      this.tel = ``;
      this.uploadTask = ``;
    }
  }
};
</script>

<style lang="sass" scoped>

</style>