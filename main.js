const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');

require('electron-reload')(__dirname + '/app/index.html', {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/app/images/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    
    // mainWindow.setResizable(false);
    // require('./controllers/utils');
    mainWindow.setMenu(null);
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    process.env.NODE_ENV !== 'production' && mainWindow.openDevTools();
});