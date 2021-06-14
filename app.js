const {
    app,
    BrowserWindow,
    Menu
  } = require('electron')
  const url = require("url");
  const path = require("path");
  
  

    
  let appWindow
  
  function initWindow() {
    console.log("LOCAL:" + app.getLocale());
    appWindow = new BrowserWindow({
      fullscreen: false,
      frame : true,
      thickFrame : true,
      title : "DIPALZA LTDA.",
      titleBarStyle: 'hidden',
      
      // width: 1000,
      // height: 800,
      webPreferences: {
        nodeIntegration: true
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

    const menu = Menu.buildFromTemplate([
      {
        label: 'Dipalza',
        submenu: [
          {
            label: 'Salir',
            click: function(){
              app.quit();
            }
          }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  
    // Initialize the DevTools.
    appWindow.webContents.openDevTools()
  
    appWindow.on('closed', function () {
      appWindow = null
    });

  }


  app.on('ready', initWindow)
  
  // Close when all windows are closed.
  app.on('window-all-closed', function () {
  
    // On macOS specific close process
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', function () {
    if (win === null) {
      initWindow()
    }
  })