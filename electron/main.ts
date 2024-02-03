import { BrowserWindow, app } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (release().startsWith('6.1')) app.disableHardwareAcceleration()

export const ROOT_PATH = {
  dist: join(__dirname, '../..'),
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}
export const INDEX_HTML_PATH = join(ROOT_PATH.dist, 'index.html')
// export const SERVER_URL = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
export const SERVER_URL = process.env.VITE_DEV_SERVER_URL!


/***************************** Mini-Server Communication ********************************/

app.whenReady().then(async (value) => {
  const window = new BrowserWindow({
    show: false,
    title: 'Main window',
    useContentSize: true,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    webPreferences: {
      sandbox: false,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  window.once('ready-to-show', () => {
    window.show()
  })

  if (app.isPackaged) {
    await window.loadFile(INDEX_HTML_PATH)
  } else {
    await window.loadURL(SERVER_URL)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools()
  }
})
