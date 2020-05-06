import Vue from 'vue'
import Vuex from 'vuex'
import {
  Loading,
  QSpinnerGears
} from 'quasar'
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import {
  Dialog
} from "quasar";
import createPersistedState from "vuex-persistedstate";

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function () {
  const Store = new Vuex.Store({
    plugins: [createPersistedState],
    modules: {
      // example
    },
    state: {
      user: null,
      dashboardPage: `list`,
      drawer: false,
      projectsOfUser: [],
      searchProject: ``,
      memberId: null
    },
    getters: {
      user: state => state.user,
      projectByName: (state) => (name) => {
        return state.projectsOfUser.filter(p => p.projectName == name)
      }
    },
    mutations: {
      SET_USER(state, payload) {
        state.user = payload
      },
      SET_DASHBOARD_PAGE(state, payload) {
        state.dashboardPage = payload
      },
      SET_DRAWER(state, payload) {
        state.drawer = payload
      },
      SET_PROJECTS_OF_USER(state, payload) {
        state.projectsOfUser = payload
      },
      SET_SEARCH_PROJECT(state, payload) {
        state.searchProject = payload
      },
      SET_MEMBER_ID(state, payload) {
        state.memberId = payload
      }
    },
    actions: {
      async login(context, payload) {
        try {
          // Loading.show({
          //   spinner: QSpinnerGears,
          // })

          const {
            email,
            password
          } = payload
          let user = await firebase.auth().signInWithEmailAndPassword(email, password)
          user = user.user
          context.commit(`SET_USER`, user)
          if (user.email == `kkte92665@gmail.com`) {
            const snapshot = await firebase.firestore().collection(`projects`).doc(email).get()
            context.commit(`SET_PROJECTS_OF_USER`, snapshot.data().projects)
            this.$router.replace(`/admin`)
          } else {
            const snapshot = await firebase.firestore().collection(`projects`).doc(email).get()
            context.commit(`SET_PROJECTS_OF_USER`, snapshot.data().projects)
            this.$router.replace(`/dashboard`)
          }
          Loading.hide()
        } catch (error) {
          Loading.hide()
          Dialog.create({
            title: `เกิดข้อผิดพลาด`,
            message: `อีเมล์หรือรหัสผ่านไม่ถูกต้อง หรือ เกิดข้อผิดพลาด`
          })
        }
      },
      async logout(context) {
        Loading.show({
          spinner: QSpinnerGears,
        })
        await firebase.auth().signOut()
        context.commit(`SET_USER`, null)
        this.$router.replace(`/`)
        Loading.hide()
      },
      async submitProject(context, payload) {
        const project = {
          id: Date.now().toString(),
          ...payload,
          status: `รอการตรวจสอบ`,
          reason: ``
        }
        const projects = context.state.projectsOfUser ? context.state.projectsOfUser : []
        projects.push(project)
        await firebase
          .firestore()
          .collection(`projects`)
          .doc(context.state.user.email)
          .update({
            projects
          });
        context.commit(`SET_PROJECTS_OF_USER`, projects)
        context.commit(`SET_DASHBOARD_PAGE`, `list`)
      }
    },
    strict: false
  })

  return Store
}
