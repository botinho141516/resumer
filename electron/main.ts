import { app, BrowserWindow, ipcMain } from 'electron';
import { UnwrapPromiseLike } from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import { initControllers } from '../src/controller/controllers';


declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string


let mainWindow: BrowserWindow | null

pie.initialize(app);


// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners(controllers: UnwrapPromiseLike<ReturnType<typeof initControllers>>) {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message);
  });

  ipcMain.on('start', (_, text: string) => {
    controllers.resumeText(text);
  });
}


app.on('ready', createWindow)
  .whenReady()
  .then(initControllers)
  .then(registerListeners)
  .catch(e => console.error(e))


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

