//
viewAsTree = ( nodes ) => {
    var mt = [];
    for (const c of nodes) {
        let name = gn( c.circle.h, c.circle.k );
        let radius = c.circle.radius;
        let sons = [];
        let gnode = graph.getNode( name );
        for (const e of gnode.edge) {
            sonrad = e.circle.radius;
            let sonInfo = {
                text: e.name + " => r : " + sonrad,
                state: {
                    expanded: false
                },
            }
            sons.push( sonInfo );
        }
        let node = {
            text: "Circle " + name + " => r : " + radius,
            state: {
                expanded: false
            },
            nodes: sons
        }
        mt.push( node );
    }
    
    $('#treeview').treeview({data: mt});
}
//
closestPair = ( g ) => {
    let fromtext;
    let totext;
    let minDist = Infinity;
    for (const c of g.nodes) {
        for (const d of g.nodes) {
            if( c != null && d != null ){
                if( c != d ){
                    let dist =  distancee( c.circle.h, c.circle.k, d.circle.h, d.circle.k );
                    if( dist < minDist ){
                        fromtext = gn(c.circle.h, c.circle.k) + " => r: " + c.circle.radius;
                        ftx = c.circle.h;
                        fty = c.circle.k;
                        totext   = gn(d.circle.h, d.circle.k) + " => r: " + d.circle.radius;
                        ttx = d.circle.h;
                        tty = d.circle.k;
                        minDist  = dist;
                    }
    
                }
            }
        }
    }
    let response = {
        f: {
            x: ftx,
            y: fty
        },
        t: {
            x: ttx,
            y: tty
        },
    }
    //Something
    $("#fromtext").html(fromtext);
    $("#totext").html(totext);
    $("#distance").html(minDist);
    return response;
}
//
drawClosest = ( g, canvas ) => {
    let pairs = closestPair( g );
    canvas.stroke( 18, 245, 254 )
    canvas.fill(  0, 79, 83 );
    canvas.circle( pairs.f.x, pairs.f.y, 10 );
    canvas.circle( pairs.t.x, pairs.t.y, 10 );
    // gO.noLoop();
}
//
showOptions = ( mx, my, g ) => {
    for (const c of g.nodes) {
        if( c!= null ){
            if( distancee( c.circle.h, c.circle.k, mx, my ) < c.circle.radius + 5 ){
                
                $('#vertexOptions').show()
                $('.vname').html(""+c.circle.h+", "+c.circle.k+"")
                let h = "" + c.circle.h + ""
                let k = "" + c.circle.k + ""
                console.log("h->"+ h)
                console.log("k->"+ k)
                $('.vh').val(h).change()
                $('.vk').val(k).change()
            }
        }
    }
    return g;
}
//
buildGraph = ( img ) => {
    let paths = [];
    //The good lines proobed that doesn't crash
    let goodLines = []
    let bg = new Graph()
    //Now see if there are crashes
    let obstacle = {
        state:  false,
        name: "TRUE OBSTACLE VARIABLE"
    };
    console.log("CRASHES")
    for (const dot of img.circlesFound) {
        //For each circle found there'll be a Node
        
        let oname = gn( dot.h, dot.k );
        let nodeExists = bg.getNode( oname );
        if( !nodeExists ){  
            oname = bg.addNode( dot );
            console.log( oname + "Node origin: ")
        }
        let originNode = bg.getNode( oname );
        // console.log( originNode );
        let destinyNode

        for (const tod of img.circlesFound) {
            //Check the destiny node
            if( tod.h == dot.h && tod.k == dot.k ){
                //Es el mismo jaja
            }else{
                let dname = gn( tod.h, tod.k );
                obstacle.state = false
                //Alredy checkeded?
                if( !lineChecked( paths, oname, dname ) ){
                    /***
                     * 
                     * 
                     ***/
                    //Create the destiny node if it doesn't exist
                    let nodeExists = bg.getNode( dname )
                    if( !nodeExists ){  
                        //The destiny Node doesn't exist. Create it
                        dname = bg.addNode( tod )
                    }
                    destinyNode = bg.getNode( dname )
                    //C
                    let path = {
                        o: oname,
                        d: dname
                    }
                    paths.push( path )
                    //Get the coordin
                    let details = getLineCoords( dot.h, dot.k, tod.h, tod.k );
                    if( details.m != 0 && details.m != "Infinity" ){
                        //The line is a diagonal
                        for (const point of details.c) {
                            //Look for the neighborhood
                            let neigh = getNeighborhood( point.x, point.y )
                            //If any of the neighborhood pixels aren't white. Then it is an obstacle
                            for (const npixel of neigh) {
                                //Check if the pixel isn't inside a the origin circle
                                if( !insideCircles(dot, tod, npixel.x, npixel.y, 5) ){
                                    // console.log("not part of the circle " + npixel.x +" , "+ npixel.y )
                                    //Nos comparing a pixel aprt of any of both circles
                                    obstacle.state = ( checkPixel( img, npixel.x, npixel.y ) ) ? false : true
                                    if ( obstacle.state ) {break;}    //If it's an obstacle in any point. Stop chequing the line.
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
                                obstacle.state = ( checkPixel( img, point.x, point.y ) ) ? false : true
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
                        goodLines.push( details )
                        originNode.addEdge( destinyNode )
                    }
                }                 
            }//else... is the same circle
        }//Destiny circle
    }//Origin circle
    return bg;
}
//
drawEdges = ( g, i, canvas ) => {
    for (const n of g.nodes) {
        if( n!= null ){
            for (const e of n.edge) {
                if( g.getNode( e.name ) != null ){
                    let coords = getLineCoords( n.circle.h, n.circle.k, e.circle.h, e.circle.k )
                    let c = coords.c
                    for (const dot of c) {
                        let index = getIndex( dot.x, dot.y, i.width )
                        setP( i, index, 0, 79, 83 );
                    }
                }
            }
        }
    }
    
    i.updatePixels();
    canvas.background(i);
    for (const ob of i.someFigure) {
        canvas.fill( 255, 255, 255, 150 )
        canvas.stroke( 0, 255, 255, 150 )
        let tol = 5
        ob.ropeA.x1 -= tol
        ob.ropeA.x2 += tol
        ob.ropeA.y1 -= tol
        ob.ropeA.y2 += tol

        ob.ropeB.x1 -= tol
        ob.ropeB.x2 += tol
        ob.ropeB.y1 -= tol
        ob.ropeB.y2 += tol
        // ob.circle( ob.h, ob.k, ob.radius*2 );
        canvas.rect( ob.ropeA.x1, ob.ropeA.y1, ob.ropeB.x2-ob.ropeA.x1, ob.ropeB.y2-ob.ropeA.y1 )
    }
}
//PLACE NAMES OF CIRCLES
drawText = ( g, canvas ) => {
    for (const c of g.nodes) {
        if( c != null ){
            canvas.textSize( 18 );
            // canvas.fill( 29, 29, 27 );
            // canvas.stroke( 0, 79, 83 );
            canvas.stroke( 18, 245, 254 );
            canvas.fill( 0, 79, 83 );
            canvas.text( c.name, c.circle.h, c.circle.k + c.circle.radius);
        }
    }
}

//
addPredator = () => {
    let vh = $(".vh")[0].value
    let vk = $(".vk")[0].value
    console.log(vh)
    

}

//
deleteVertex = (  ) => {
    let vh = $(".vh")[0].value
    let vk = $(".vk")[0].value
    console.log(vk)
    // // var r = confirm("Quieres borrar el vertice: " + c.circle.h + ", "+ c.circle.k);
    // // if (r == true) {
    //     let name = gn( vh, vk );
    //     graph.deleteNode( name );
        
    // // } else {
    //     window.alert("NOTHING DONE");
    // }
    // $('#vertexOptions').load('./src/components/vertexOptions/vertexOptions.html')
    

}

//
cancelOption = () => {
    $('#vertexOptions').html("");
    $('#vertexOptions').hide();
}