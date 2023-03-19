import { contextBridge, ipcRenderer } from "electron/renderer";
import { Favorite } from "entity/Favorite";
import { ElectronAPI } from "./main";

const apiKey = "electron";
const api: ElectronAPI = {
  index: () => ipcRenderer.invoke("index"),
  getFavorites: () => ipcRenderer.invoke("get-favorites"),
  addFavorite: (favorite: Favorite) =>
    ipcRenderer.invoke("add-favorite", favorite),
  removeFavorite: (url: string) => ipcRenderer.invoke("remove-favorite", url),
  setWebviewBounds: (rect) => ipcRenderer.invoke("set-webview-bounds", rect),
  webviewGoBack: () => ipcRenderer.invoke("webview-go-back"),
  webviewReload: () => ipcRenderer.invoke("webview-reload"),
  webviewLoadURL: (url?: string) => ipcRenderer.invoke("webview-load-url", url),
  rendererEvent: (channel, listener) => ipcRenderer.on(channel, listener),
  removeEventListener: (channel, listener) =>
    ipcRenderer.removeListener(channel, listener),
  webwiewGoHome: () => ipcRenderer.invoke("webview-go-home"),
};

contextBridge.exposeInMainWorld(apiKey, api);
