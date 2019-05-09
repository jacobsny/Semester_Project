console.log('WORK');


const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;


function createWindow(){
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            webSecurity: false
        }
    });

    win.loadURL('http://127.0.0.1:8080');

    win.on('closed', () => {
      win = null;
    })
}

app.on('ready', createWindow);


