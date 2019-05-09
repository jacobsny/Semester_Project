console.log('WORK');


const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;


function createWindow(){
    // win = new BrowserWindow();
    // win.loadURL('http://127.0.0.1:8080/game')
    //
    // win.on('closed', () => {
    //   win = null;
    // })
    const { BrowserWindow } = require('electron')

// Or use `remote` from the renderer process.
// const { BrowserWindow } = require('electron').remote

    let win = new BrowserWindow({ width: 900, height: 900 })
    win.on('closed', () => {
        win = null
    })

// Load a remote URL
    win.loadURL('http://127.0.0.1:8080/game')
}

app.on('ready', createWindow);


