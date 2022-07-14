const {
    app,
    BrowserWindow,
    Menu
} = require('electron')
const url = require("url");
const path = require("path");




let appWindow

function initWindow() {
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
    console.log(`LOCAL:${app.getLocale()}`);
    appWindow = new BrowserWindow({
        fullscreen: false,
        frame: true,
        thickFrame: true,
        title: "DIPALZA LTDA.",
        titleBarStyle: 'hidden',


        // width: 1000,
        // height: 800,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInSubFrames: false,
            webSecurity: false,
        }
    })



    appWindow.webContents.session.webRequest.onHeadersReceived({ urls: ['*://*/*'] },
        (details, callback) => {
            Object.keys(details.responseHeaders).filter(x => x.toLowerCase() === 'x-frame-options')
                .map(x => delete details.responseHeaders[x])

            callback({
                cancel: false,
                responseHeaders: details.responseHeaders,
            })
        },
    )

    appWindow.webContents.session.on('select-hid-device', (event, details, callback) => {
        event.preventDefault()
        if (details.deviceList && details.deviceList.length > 0) {
            callback(details.deviceList[0].deviceId)
        }
    })

    appWindow.webContents.session.on('hid-device-added', (event, device) => {
        console.log('hid-device-added FIRED WITH', device)
    })

    appWindow.webContents.session.on('hid-device-removed', (event, device) => {
        console.log('hid-device-removed FIRED WITH', device)
    })

    appWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
        if (permission === 'hid' && details.securityOrigin === 'file:///') {
            return true
        }
    })



    appWindow.setMenu(null);
    // Electron Build Path
    appWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );

    const menu = Menu.buildFromTemplate([{
        label: 'Dipalza',
        submenu: [{
            label: 'Salir',
            click() {
                app.quit();
            }
        }]
    }]);
    Menu.setApplicationMenu(menu);

    // Initialize the DevTools.
    appWindow.webContents.openDevTools()

    appWindow.on('closed', () => {
        appWindow = null
    });

}


app.on('ready', initWindow)

// Close when all windows are closed.
app.on('window-all-closed', function() {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    if (win === null) {
        initWindow()
    }
})