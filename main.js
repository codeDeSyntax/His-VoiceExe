import path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, Menu, screen } from 'electron';

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

let mainWindow;

// Main Window
function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    minWidth: width,
    height: height,
    // icon: path.join(__dirname, 'assets', 'broBob.png'), // Uncomment if you have an icon
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const startUrl = path.join(__dirname, 'renderer', 'index.html');
  // mainWindow.loadURL(`file://${startUrl}`);
    mainWindow.loadURL('http://localhost:3001/')
}

// About Window
// function createAboutWindow() {
//   const __dirname = path.dirname(fileURLToPath(import.meta.url));
//   aboutWindow = new BrowserWindow({
//     width: 300,
//     height: 300,
//     title: 'About Electron',
//     icon: path.join(__dirname, 'assets', 'Brobob.jpg'),
//   });

//   aboutWindow.loadFile(path.join(__dirname, 'renderer', 'about.html'));
// }
// function openSongBook() {
//   const __dirname = path.dirname(fileURLToPath(import.meta.url));
//   songBookWindow = new BrowserWindow({
//     width: 1000,
//     height: 1000,
//     title: 'song book',
//     icon: path.join(__dirname, 'assets', 'Brobob.jpg'),
//   });

//   songBookWindow.loadFile(path.join(__dirname, 'renderer', 'songbook.html'));
// }

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
              // click: createAboutWindow,
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
          label: 'Help',
          submenu: [
            {
              label: 'About',
              // click: createAboutWindow,
            },
            {
              label: 'Open songbook',
              // click: openSongBook,
            },
          ],
        },
      ]
    : []),

  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
];

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// Open a window if none are open (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
