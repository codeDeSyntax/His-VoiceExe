import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, screen, ipcMain } from 'electron';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let loadingWindow;

function createLoadingWindow() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  loadingWindow = new BrowserWindow({
    width: 700,
    height: 500,
    frame: false,
    roundedCorners: true,
    backgroundColor: '#202425',
    center: true,
    title: 'Loading...',
    skipTaskbar: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  loadingWindow.loadFile(path.join(__dirname, './ui/loader.html'));
}

function createMainWindow() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, 'app', '/build/cloud.png'),
    resizable: isDev,
    frame: false,
    theme: 'dark',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.cjs'),
    },
    show: false,
  });

   const startUrl = path.join(__dirname, 'app', '/build/index.html');
  mainWindow.loadURL(`file://${startUrl}`);
  // mainWindow.loadURL('http://localhost:3001/');
  mainWindow.setMenuBarVisibility(false);

  ipcMain.on("minimizeApp", () => {
    mainWindow?.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on("closeApp", () => {
    mainWindow?.close();
  });


  mainWindow.webContents.on('did-finish-load', () => {
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.close();
    }
    mainWindow.maximize();
    mainWindow.show();
    // if (isDev) {
    //   mainWindow.webContents.openDevTools();
    // }
    
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createLoadingWindow();
  createMainWindow();

});

app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});

export default app;