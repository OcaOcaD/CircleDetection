let canvasX = 100;
let canvasY = 100;
var socket = io.connect('http://localhost:3000');
let graph = new Graph;
let predators = []
let img
setEventListeners = ( canvas ) => {
    canvas.mouseClicked = ( event ) => {
        showOptions( event.layerX, event.layerY, graph, canvas )
    }
}

//
sortAndShow = ( g ) => {
    let temp;
    let nodes = g.nodes;
    for (var some = 0; some < nodes.length; some++) {
        for (var i = 0; i < nodes.length-1; i++) {
            let j = i+1;
            let first = nodes[i].circle;
            // console.log("first: ")
            // console.log( first )
            let second = nodes[j].circle;
            // console.log("second: ")
            // console.log( second )
            if ( first.radius > second.radius ){
                temp = nodes[i];
                nodes[i] = nodes[j];
                nodes[j] = temp;
            }
        }
    }
    viewAsTree( nodes );
}

/****SET UP THE SKETCH */
var sketch = (p) => {
    p.setup = () => {
        socket.on('imageChange', p.newDrawing)
        // p.noLoop()
    }
    p.newDrawing = ( data ) => {
        //Recieve data and create a original canvas load the image and a ;
        canvasX = data.x; canvasY = data.y;    imageName = data.n        //Receiving info
        p.createCanvas(canvasX, canvasY)
            .parent("circleCircles")
        //Set event listeners for the canvas. Delete Vertex. Create agent. Create target.
        setEventListeners( p )
        orImg = p.loadImage("src/img/"+ imageName +".png", p.saveButton)   //Original image
        img   = p.loadImage("src/img/"+ imageName +".png", p.drawImage )   //to Modify
        // p.noLoop();
    }
    p.drawImage = ( img ) => {
        p.image( img, 0, 0 )
        img.loadPixels()
        analize( img )
        outputData( img )
        graph = buildGraph( img )
        //Update the pixels and see the magic
        drawGraph( graph, img, p )
        sortAndShow( graph )
        // p.noLoop();
        //Event lister to download modified
        let b_o = p.createButton("Get modified")
        b_o.mousePressed( function(){
            p.save(img, "Modified_"+imageName+".png")
        } )
        /**START SETING UP THE PREDATORS AND PREYS */
        let cost = graph.getMinimumCost()
        console.log("THE MINIMUM COST IS: " + cost)

        
    }
    p.star = ( x,y,radius1,radius2,npoints ) => {
        let angle = p.TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
            let sx = x + p.cos(a) * radius2;
            let sy = y + p.sin(a) * radius2;
            p.vertex(sx, sy);
            sx = x + p.cos(a + halfAngle) * radius1;
            sy = y + p.sin(a + halfAngle) * radius1;
            p.vertex(sx, sy);
        }
        p.endShape(p.CLOSE);
    }
    p.draw = () => {
        drawPredators( p, graph )
        movePredators( graph )

    }
    //BUTTONS
    p.saveButton = (orImg) =>{
        //Event lister
        let b_o = p.createButton("Get original")
        b_o.mousePressed( function(){
            p.save(orImg, "Original_"+imageName+".png")
        } )
    }
}
/***SOME PREDATOR FUCNTIONS */
drawPredators = ( canvas, g ) => {
    canvas.rectMode(canvas.CENTER)
    setColor( canvas, r, dr )
    for (let i in predators) {
        predators[i].setDestination( g )
        canvas.star( predators[i].x, predators[i].y, predators[i].radius1, predators[i].radius2, predators[i].peaks )
        console.log( predators )
    }
    canvas.rectMode(canvas.CORNER)
}
movePredators = ( g ) => {
    // console.log( predators )
    for (let i in predators) {
        predators[i].move( g )
    }
}
drawStages = ( g, cost ) => {
    for (const n of g.nodes) {
        for (const e of n.edge) {
            let x100 = e.circle.h
            let y100 = e.circle.k
            for (const c of e.edgeCoords) {
                
            }
        }
    }
}
var myp5 = new p5(sketch);
