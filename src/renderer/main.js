import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

const {autoUpdater} = require("electron-updater");
const isDev = require("electron-is-dev");
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on('checkig-for-update', () => {
  console.log("checking for updates...");
});

autoUpdater.on('update-available', (info) => {
  console.log("update available");
  console.log("Version", info.version);
  console.log("Release Date", info.releaseDate);
});

autoUpdater.on('update-not-available', () => {
  console.log("Update not available");
});

autoUpdater.on('download-progress', (progress) => {
  console.log(`Progress ${Math.floor(progress.percent)}`);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log("Update downloaded");
  autoUpdater.quitAndInstall()
});

autoUpdater.on('error', (error) => {
  console.log("Error occured",error);
});

if (!isDev) {
  autoUpdater.checkForUpdates()
}

if (!process.env.IS_WEB) {}Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
