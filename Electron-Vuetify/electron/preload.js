const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  minimize: () => ipcRenderer.send('window-control', 'minimize'),
  maximize: () => ipcRenderer.send('window-control', 'maximize'),
  close: () => ipcRenderer.send('window-control', 'close'),
  isMaximized: () => ipcRenderer.invoke('is-maximized'),
  restoreWindow: () => ipcRenderer.send('window-control', 'restore-window')
})
