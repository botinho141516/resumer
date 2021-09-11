import { app, BrowserWindow, ipcMain } from 'electron';
import { initControllers } from '../src/controller/controllers';
import { initPuppeteer } from '../src/controller/puppeteer/puppeteer';
import { initResoomerPuppeteer } from '../src/controller/puppeteer/resoomer';
import pie from 'puppeteer-in-electron';

let mainWindow: BrowserWindow | null

pie.initialize(app);


const puppeteerController = initPuppeteer({ app, pie });
const resoomer = initResoomerPuppeteer();
const controllers = initControllers({
  puppeteer: puppeteerController,
  resoomer
});

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

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

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message);
  });

  ipcMain.on('start', (_, text: string) => {
    console.log(_, text)
    controllers.resumeText(text);
  });
}


app.on('ready', createWindow)
  .whenReady()
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
