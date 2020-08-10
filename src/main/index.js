'use strict'

import { app, BrowserWindow, IpcMain, ipcMain } from 'electron'
import '../renderer/store'

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffprobePath = require('@ffprobe-installer/ffprobe').path
const ffmpeg = require('fluent-ffmpeg')

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

const streamPath = 'udp://@235.101.23.11:51010'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true
    }
    // alwaysOnTop: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('uncaughtException', (err) => {
  console.error('uncaughtException', err)
})

ipcMain.on('getStream', (event, arg) => {
  const command = ffmpeg(streamPath)
    .outputOptions(['-movflags isml+frag_keyframe'])
    .toFormat('webm')
    .videoCodec('libvpx')
    .size('50%')
    .videoBitrate(500, true) //Outputting a constrained 1Mbit VP8 video stream
    .outputOptions(
      '-minrate',
      '500',
      '-maxrate',
      '500',
      '-threads',
      '3', //Use number of real cores available on the computer - 1
      '-flags',
      '+global_header', //WebM won't love if you if you don't give it some headers
      '-psnr'
    )
    .noAudio()
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message)
    })
    .on('end', function() {})

  const ffstream = command.pipe()
  ffstream.on('data', function(chunk) {
    console.log('ffmpeg just wrote ' + chunk.length + ' bytes')
    event.sender.send('test-reply', chunk)
  })
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
