const { app, BrowserWindow, ipcMain } = require('electron')
const pkjson = require('./package.json')
const path = require('path')
const url = require('url')
const fs = require('fs')
const util = require('util')
const appLocation = require('electron-root-path').rootPath
const appName = 'midori'
const configDirPath = `${appLocation}${path.sep}config`


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let splash

function createWindow() {
  const dirpath = __dirname
  const dirname = dirpath.substring(dirpath.lastIndexOf(path.sep) + 1, dirpath.length)

  splash = new BrowserWindow({ 
    width: 1366, 
    height: 768, 
    frame: false,
    icon: path.join(__dirname, 'favicon.ico'), 
    alwaysOnTop: true })
  splash.loadURL(url.format({
    pathname: path.join(__dirname, `dist${path.sep}${dirname}${path.sep}splash.html`),
    protocol: 'file:',
    slashes: true
  }))

  // Create the browser window.
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'favicon.ico'),
    show: false
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, `dist${path.sep}${dirname}${path.sep}index.html`),
    protocol: 'file:',
    slashes: true
  }))  

  // hide the menu bar.
  win.setMenuBarVisibility(false)

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  if (!fs.existsSync(configDirPath)) {
    fs.mkdirSync(configDirPath);
  }

  win.once('ready-to-show', () => {
    setTimeout(() => {
      splash.destroy();
      win.show();
    }, 1500);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('write-settings-file', (event, environment, connectionInfo) => {
  const settingsFilePath = `${configDirPath}${path.sep}connection_${environment}.conf`
  fs.openSync(settingsFilePath, 'w');
  fs.writeFileSync(settingsFilePath, connectionInfo)
  event.sender.send('write-settings-file-resp', 'OK')
})

ipcMain.on('read-settings-file', (event, environment) => {
  const settingsFilePath = `${configDirPath}${path.sep}connection_${environment}.conf`
  if (!fs.existsSync(settingsFilePath)) {
    event.sender.send('read-settings-file-resp', '{}')
  } else {
    const content = fs.readFileSync(settingsFilePath)
    event.sender.send('read-settings-file-resp', content)
  }
})

ipcMain.on('get-node-version', (event) => {
  event.sender.send('get-node-version-resp', process.versions['node'])
})

ipcMain.on('get-electron-version', (event) => {
  event.sender.send('get-electron-version-resp', process.versions['electron'])
})

ipcMain.on('get-chrome-version', (event) => {
  event.sender.send('get-chrome-version-resp', process.versions['chrome'])
})

ipcMain.on('get-v8-version', (event) => {
  event.sender.send('get-v8-version-resp', process.versions['v8'])
})

ipcMain.on('get-app-version', (event) => {
  event.sender.send('get-app-version-resp', pkjson.version)
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
