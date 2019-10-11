const express = require('express')
// File system
var fs = require('fs')
//Know the dimentions of an image
var sizeOf = require('image-size')
//Server stuff
var app = express()
var server = app.listen(3000)
app.use( express.static('public') )
console.log("Circles detection and graph algorithms")
//Socket.io
var socket = require('socket.io')
var io = socket(server)
//New connection to the server
io.sockets.on('connection', (socket) => {
    console.log("New connection: "+ socket.id) //Print the id of the connection
    socket.on('changeImage', (name) => {
        //If the image has been changed. Look for the file and return.........
        console.log("Image to analize: " + name)  
        sizeOf('public/src/img/'+name+'.png', function (err, dimensions) {
            console.log(dimensions);
            let data = {
                x: dimensions.width,
                y: dimensions.height,
                t: dimensions.type,
                n: name
            }
            socket.emit('imageChange', data)
        });
        
    })
})