var path = require("path")

module.exports={
    entry:{
        entrypoint:'./app.js'
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:"main.js"
    },
    node:{

    },
    externals: [{
        xmlhttprequest:'{XMLHttpRequest:XMLHttpRequest}'
     }]
}
