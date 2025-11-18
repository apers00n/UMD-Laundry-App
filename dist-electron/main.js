import { ipcMain as t, app as o, BrowserWindow as r } from "electron";
import { fileURLToPath as m } from "node:url";
import i from "node:path";
const n = i.dirname(m(import.meta.url));
process.env.APP_ROOT = i.join(n, "..");
const s = process.env.VITE_DEV_SERVER_URL, w = i.join(process.env.APP_ROOT, "dist-electron"), a = i.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? i.join(process.env.APP_ROOT, "public") : a;
let e;
function l() {
  e = new r({
    icon: i.join(n, "../public/icon.png"),
    frame: !1,
    webPreferences: {
      preload: i.join(n, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), s ? e.loadURL(s) : e.loadFile(i.join(a, "index.html"));
}
t.on("window-close", () => {
  e && o.quit();
});
t.on("window-minimize", () => {
  e && e.minimize();
});
t.on("window-toggle-maximize", () => {
  e && (e.isMaximized() ? e.unmaximize() : e.maximize());
});
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("activate", () => {
  r.getAllWindows().length === 0 && l();
});
o.whenReady().then(l);
export {
  w as MAIN_DIST,
  a as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
