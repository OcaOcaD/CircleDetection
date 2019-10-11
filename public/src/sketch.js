let canvasX = 100
let canvasY = 100
var socket = io.connect('http://localhost:3000')
let graph = new Graph()
let predators = []
let img
setEventListeners = () => {
    mouseClicked = ( event ) => {
        showOptions( event.layerX, event.layerY, graph )
    }
}
//
sortAndShow = ( g ) => {
    let nodes = g.sortByRadius()
    viewAsTree( nodes )
}

/****SET UP THE SKETCH */
setup = () => { socket.on('imageChange', newDrawing) }
newDrawing = ( data ) => {
    //Recieve data and create a original canvas load the image and a ;
    canvasX = data.x; canvasY = data.y;    imageName = data.n        //Receiving info
    createCanvas(canvasX, canvasY)
        .parent("circleCircles")
    //Set event listeners for the canvas. Delete Vertex. Create agent. Create target.
    setEventListeners()
    orImg = loadImage("src/img/"+ imageName +".png", saveButton)   //Original image
    img   = loadImage("src/img/"+ imageName +".png", drawImage )   //to Modify
}
drawImage = async ( img ) => {
    image( img, 0, 0 )
    img.loadPixels()
    analize( img )
    outputData( img )
    await buildGraph( img, graph )
        .then( ( g ) => { graph = g } )
    //Update the pixels and see the magic
    sortAndShow( graph )
    //Event lister to download modified
    createDownloadButtons()
    
}
draw = () => {
    background( grey )
    graph.draw()
    graph.text()
    drawPredators( graph )
    movePredators( graph )

}
//BUTTONS
saveButton = (orImg) =>{
    //Event lister
    let b_o = createButton("Download original")
    b_o.mousePressed( function(){
        save(orImg, "Original_"+imageName+".png")
    } )
}
createDownloadButtons = () => {
    let b_o = createButton("Download modified")
    b_o.mousePressed( function(){
        save(img, "Modified_"+imageName+".png")
    } )
}
