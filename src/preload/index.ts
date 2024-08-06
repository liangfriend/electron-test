import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getFile:(start)=>{
    return ipcRenderer.invoke('getFile',start)
  },
  stop: () => {
    return ipcRenderer.invoke('stop')
  },
  getFileProgress: (callback) => ipcRenderer.on('getFileProgress', (_event, value,end) => callback(value,end)),
  notificationMessage: (callback) => ipcRenderer.on('notificationMessage', (_event, value) => callback(value)),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
