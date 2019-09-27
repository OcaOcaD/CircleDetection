
let canvasX = 100;
let canvasY = 100;
var socket = io.connect('http://localhost:3000');
let graph = new Graph;
// graph.graph["HOLA"] = "Ahorita vemos que pedo";
// console.log("CHECANDO EL GET NODE");
// let gtest = graph.getNode( "HOLAa" )
// if( gtest ){
//     console.log("1")
//     console.log(gtest);
// }else{
//     console.log("2")
//     console.log(gtest);
// }
// console.log(graph);
var sketch = (p) => {
    p.setup = () => {
        console.log("SETUP DRAWING");
        socket.on('imageChange', p.newDrawing);
        p.noLoop();
    }
    p.newDrawing = ( data ) => {
        //Recieve data and create a original canvas load the image and a ;
        canvasX = data.x; canvasY = data.y;    imageName = data.n;        //Receiving info
        p.createCanvas(canvasX, canvasY);                                   //Canvas
        orImg = p.loadImage("src/img/"+ imageName +".png", p.saveButton);   //Original image
        img   = p.loadImage("src/img/"+ imageName +".png", p.drawImage );   //to Modify
        p.noLoop();
    }
    p.drawImage = ( img ) => {
        p.image( img, 0, 0 );
        console.log(img);
        img.loadPixels();
        analize( img );       
        outputData( img );
        //Visited ones
        let paths = [];
        //The good lines proobed that doesn't crash
        let goodLines = [];
        //Now see if there are crashes
        let obstacle = {
            state:  false,
            name: "TRUE OBSTACLE VARIABLE"
        };
        console.log("CRASHES")
        for (const dot of img.circlesFound) {
            //For each circle found there'll be a Node
            
            let oname = gn( dot.h, dot.k );
            let nodeExists = graph.getNode( oname );
            if( !nodeExists ){  
                oname = graph.addNode( dot );
                console.log( oname + "Node origin: ")
            }
            let originNode = graph.getNode( oname );
            // console.log( originNode );
            let destinyNode;

            for (const tod of img.circlesFound) {
                //Check the destiny node
                if( tod.h == dot.h && tod.k == dot.k ){
                    //Es el mismo jaja
                    console.log("Es el mismo jaja");
                }else{
                    console.log("from : " + dot.h + ", " + dot.k + " to : " + tod.h + ", " + tod.k )
                    let dname = gn( tod.h, tod.k );
                    obstacle.state = false;
                    //Alredy checkeded?
                    if( !lineChecked( paths, oname, dname ) ){
                        /***
                         * 
                         * 
                         ***/
                        //Create the destiny node if it doesn't exist
                        let nodeExists = graph.getNode( dname );
                        if( !nodeExists ){  
                            //The destiny Node doesn't exist. Create it
                            dname = graph.addNode( tod );
                            console.log("Node destin:" + dname )
                        }else{
                            console.log(dname + " ya existe");
                        }
                        destinyNode = graph.getNode( dname );
                        console.log( destinyNode );
                        //C
                        let path = {
                            o: oname,
                            d: dname
                        }
                        paths.push( path );
                        //Get the coordin
                        let details = getLineCoords( dot.h, dot.k, tod.h, tod.k );
                        console.log("coords")
                        console.log(details);
                        if( details.m != 0 && details.m != "Infinity" ){
                            console.log( "THE SLOPE IS: " + details.m )
                            //The line is a diagonal
                            for (const point of details.c) {
                                //Look for the neighborhood
                                let neigh = getNeighborhood( point.x, point.y );
                                //If any of the neighborhood pixels aren't white. Then it is an obstacle
                                for (const npixel of neigh) {
                                    //Check if the pixel isn't inside a the origin circle
                                    if( !insideCircles(dot, tod, npixel.x, npixel.y, 5) ){
                                        // console.log("not part of the circle " + npixel.x +" , "+ npixel.y )
                                        //Nos comparing a pixel aprt of any of both circles
                                        obstacle.state = ( checkPixel( img, npixel.x, npixel.y ) ) ? false : true;
                                        if ( obstacle.state ) {console.log("NO AGREGAR");break;}    //If it's an obstacle in any point. Stop chequing the line.
                                    }//else... is inside the a circle.. don't check if obstacle
                                }//all Pixels in the neighborhood of this coordinate
                                if( obstacle.state ) break;
                            }//all coordinates in the line
                        }else{
                            //The slope is either 0 or Infinity. The line is straight
                            for (const point of details.c) {
                                if( !insideCircles(dot, tod, point.x, point.y, 5) ){
                                    // console.log("not part of the circle " + point.x +" , "+ point.y )
                                    //Nos comparing a pixel aprt of any of both circles
                                    obstacle.state = ( checkPixel( img, point.x, point.y ) ) ? false : true;
                                    if ( obstacle.state ) { break;}    //If it's an obstacle in any point. Stop chequing the line.
                                }//else... is inside the a circle.. don't check if obstacle
                            }//all coordinates in the line
                            if( obstacle.state ) break;
                        }//Line checked m == 1 or Infinity or none  
                        /**
                         * 
                         * 
                         * 
                         */
                        if( !obstacle.state  ){
                            console.log("NO OBTACULOS")
                            console.log(" DE ")
                            console.log( originNode )
                            console.log(" A ")
                            console.log( destinyNode )
                            goodLines.push( details );
                            originNode.addEdge( destinyNode );
                            console.log(graph);
                        }else{
                            console.log("ni pepe");
                            // p.stroke(0,255,255)
                        }
                    }                 
                }//else... is the same circle
            }//Destiny circle
        }//Origin circle
        console.log("GRAPHHHHHHHHHHHHHHHHHH NODES");
        console.log(graph);
        console.log("LINES GOOD");
        console.log(goodLines);
        //Draw all the edges
        let drawn = [];
        for (const l of goodLines) {
            console.log("dibujando línea?")
            if( l.c.length > 0 ){
                console.log("ok")
                for (const coord of l.c) {
                    let index = getIndex( coord.x, coord.y, img.width );
                    setP( img, index, 255, 0, 255 );   
                }
            }
        }

        // for (const n of graph.nodes) {
        //     for (const e of n.edge) {
        //         console.log("1 ARISTA");
        //         for
        //     }
        // }

        //Update the pixels and see the magic
        img.updatePixels();
        
        p.background( img );
        // redraw();
        //The good ones canvas
        var goodOnes = (gO) => {
            console.log( img )
            let lines = [];
            gO.setup = () => {
                let clean = gO.createCanvas(canvasX, canvasY);
                console.log("DRAWING GOOD ONES");
                gO.background( 29, 29, 27 );   //g
                for (const c of img.circlesFound) {
                    gO.fill( 0, 79, 83);    //db
                    gO.stroke( 18, 245, 254 ); //b
                    gO.circle( c.h, c.k, c.radius*2 );
                }
                //Event lister to download modified
                let b_o = p.createButton("Get clean");
                b_o.mousePressed( function(){
                    p.save(clean, "Clean_"+imageName+".png");
                } );
                let cont = 0;
                for (const cirkulo of img.circlesFound) {
                    
                    gO.createElement('h3', cont);
                    gO.createElement('p', cirkulo.h + ", " + cirkulo.k + ' RADIO => '+ cirkulo.radius);
                    cont++;
                }
                gO.noLoop();
            }
            gO.draw = (  ) => {

                gO.background( 29, 29, 27 );   //g
                for (const c of img.circlesFound) {
                    gO.fill( 0, 79, 83);    //db
                    gO.stroke( 18, 245, 254 ); //b
                    gO.circle( c.h, c.k, c.radius*2 );
                }
            }
            
        }
        //Event lister to download modified
        let b_o = p.createButton("Get modified");
        b_o.mousePressed( function(){
            p.save(img, "Modified_"+imageName+".png");
        } );
        //Create the clean canvas
        var rightDraw = new p5(goodOnes);
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


// preload = () => {
    
// }
