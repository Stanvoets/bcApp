const { ipcRenderer } = require('electron')

function init() {
    ipcRenderer.on('debug', function (e, a) {
        console.log('/\\-------------------  DEGUG  -------------------/\\')
        console.log(a)
    })
}


export default {
    init: function(){
        init()
    }
}