import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, Menu, screen } from 'electron';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;
let noteAppWindow;
let aboutWindow;

// Main Window
function createMainWindow() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, 'app', '/build/cloud.png'), // Uncomment if you have an icon
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
    useContentSize: true,
  });

  const startUrl = path.join(__dirname, 'app', '/build/index.html');
  mainWindow.loadURL(`file://${startUrl}`);
  // mainWindow.loadURL('http://localhost:3000/');


}

function createAboutWindow() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  aboutWindow = new BrowserWindow({
    width: Math.min(800, width),
    height: Math.min(800, height),
    title: 'About Electron',
    icon: path.join(__dirname, 'assets', 'Brobob.jpg'),
    useContentSize: true,
  });

  aboutWindow.loadFile(path.join(__dirname, 'about.html'));
}

function openNoteApp() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  noteAppWindow = new BrowserWindow({
    width: Math.min(1000, width),
    height: Math.min(1000, height),
    title: 'Song Book',
    icon: path.join(__dirname, 'app', '/build/Bro bob.ico'),
    useContentSize: true,
  });

  noteAppWindow.loadFile(path.join(__dirname, 'notes.html'));
}

// When the app is ready, create the window
app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Remove variable from memory
  mainWindow.on('closed', () => (mainWindow = null));
});

// Menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Apps',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
            {
              label: 'Open Notes',
              click: openNoteApp,
            },
          ],
        },
      ]
    : []),

  // ...(isDev
  //   ? [
  //       {
  //         label: 'Developer',
  //         submenu: [
  //           { role: 'reload' },
  //           { role: 'forcereload' },
  //           { type: 'separator' },
  //           { role: 'toggledevtools' },
  //         ],
  //       },
  //     ]
  //   : []),
];

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
