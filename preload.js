import { homedir as _homedir } from "os";
import { join as _join } from "path";
import { contextBridge, ipcRenderer } from "electron";
// const Toastify = require('toastify-js');

contextBridge.exposeInMainWorld("os", {
  homedir: () => _homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => _join(...args),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

// contextBridge.exposeInMainWorld('Toastify', {
//   toast: (options) => Toastify(options).showToast(),
// });
