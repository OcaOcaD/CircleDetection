let canvasX = 100;
let canvasY = 100;
var socket = io.connect('http://localhost:3000');
let graph = new Graph();
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
        .then( ( g ) => {
            graph = g
            console.log(graph)
            console.log("JUST BUILDED THE GRAPHHHH")
            
        } )
    console.log("SO NOW IMMA DRAWIT")
    //Update the pixels and see the magic
    // drawGraph( graph, img )
    sortAndShow( graph )
    //Event lister to download modified
    let b_o = createButton("Get modified")
    b_o.mousePressed( function(){
        save(img, "Modified_"+imageName+".png")
    } )

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
        let b_o = createButton("Get original")
        b_o.mousePressed( function(){
            save(orImg, "Original_"+imageName+".png")
        } )
    }
/***SOME PREDATOR FUCNTIONS */
drawPredators = ( g ) => {
    rectMode(CENTER)
    setColor( r, dr )
    for (let i in predators) {
        predators[i].setDestination( g )
        predators[i].draw()
    }
    rectMode(CORNER)
}
movePredators = ( g ) => {
    for (let i in predators) {
        predators[i].move( g )
    }
}


