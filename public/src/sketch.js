let canvasX = 100;
let canvasY = 100;
var socket = io.connect('http://localhost:3000');
let graph = new Graph;

setEventListeners = ( canvas ) => {
    canvas.mouseClicked = ( event ) => {
        let gnodes = graph.nodes.length
        showOptions( event.layerX, event.layerY, graph, canvas )





        if ( gnodes != graph.nodes.length ){
            // Create a clean image and draw the dges of the new graph
            canvas.loadImage("src/img/"+ imageName +".png", ( i ) =>{
                i.loadPixels()
                drawGraph( graph, i, canvas )
                sortAndShow( graph )
            });
        }
    }
}
//
sortAndShow = ( g ) => {
    let nodes = g.nodes;
    let temp;
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
//
drawGraph = ( g, i, canvas ) => {
    drawEdges( g, i, canvas )
    drawClosest( g, canvas )
    drawText( g, canvas )
    // sortAndShow( g )
}

/****SET UP THE SKETCH */
var sketch = (p) => {
    p.setup = () => {
        socket.on('imageChange', p.newDrawing);
        p.noLoop();
    }
    p.newDrawing = ( data ) => {
        //Recieve data and create a original canvas load the image and a ;
        canvasX = data.x; canvasY = data.y;    imageName = data.n;        //Receiving info
        p.createCanvas(canvasX, canvasY)
            .parent("circleCircles")
        //Set event listeners for the canvas. Delete Vertex. Create agent. Create target.
        setEventListeners( p );
        orImg = p.loadImage("src/img/"+ imageName +".png", p.saveButton);   //Original image
        img   = p.loadImage("src/img/"+ imageName +".png", p.drawImage );   //to Modify
        p.noLoop();
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
        let b_o = p.createButton("Get modified");
        b_o.mousePressed( function(){
            p.save(img, "Modified_"+imageName+".png");
        } );
    }
    p.draw = () => {
        p.background( 180, 252, 255 );
    }
    //BUTTONS
    p.saveButton = (orImg) =>{
        //Event lister
        let b_o = p.createButton("Get original");
        b_o.mousePressed( function(){
            p.save(orImg, "Original_"+imageName+".png");
        } );
    }
}

var myp5 = new p5(sketch);
