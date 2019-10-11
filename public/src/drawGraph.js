var gg;
var kk;
var oh;
var ok;
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
drawClosest = ( g ) => {
    let pairs = closestPair( g );
    stroke( 18, 245, 254 )
    fill(  0, 79, 83 );
    circle( pairs.f.x, pairs.f.y, 10 );
    circle( pairs.t.x, pairs.t.y, 10 );
    // gO.noLoop();
}
//
showOptions = ( mx, my, g ) => {
    // console.log(mx + "--" +my);
    let found = false
    for (let c of g.nodes) {
        // console.log("checkin")
        if( c!= null ){
            if( distancee( c.circle.h, c.circle.k, mx, my ) < c.circle.radius + 5 ){
                // console.log("found")
                found = true
                $('#vertexOptions').show()
                $('.vname').html(""+c.circle.h+", "+c.circle.k+"")
                // console.log("shown")
                gg = g;
                oh = c.circle.h;
                ok = c.circle.k;
            }
        }
    }
    if( !found )
        $('#vertexOptions').hide()
}
//
buildGraph = ( img, ggg ) => {
    return new Promise( async ( resolve, reject ) => {
        let paths = []
        //The good lines proobed that doesn't crash
        console.log("Parameters graph", ggg)
        let tng = new Graph()
        console.log("TOTALLY NEW: ", tng)
        for (const nn of img.circlesFound) {
            tng.addNode( nn )
        }
        // console.log("Starting graph", bg)
        //Now see if there are crashes
        for (const dot of img.circlesFound) {
            console.log("STARTING ONE")
            //For each circle found there'll be a Node
            let oname = gn( dot.h, dot.k )
            let originNode = tng.getNode( oname );
            // console.log( originNode );

            for (const tod of img.circlesFound) {
                //Check the destiny node
                let valid = await validLine( img, dot, tod, paths )
                    .then( async ( res )=> {
                        let img = res.img
                        let dot = res.origin
                        let tod = res.dest
                        let dname = gn( tod.h, tod.k )
                        console.log("Valid line: ", oname, dname)
                        /** */
                        
                        //C
                        let path = {
                            o: oname,
                            d: dname
                        }
                        paths.push( path )
                        //Get the coordin.
                        // Promise finding Line coordinates
                        let middlecoords = await getLineCoords( dot.h, dot.k, tod.h, tod.k )
                        return middlecoords
                        /** */
                    } )
                    .catch( err=> console.log("Not valid: ",err) )
                    .then( async ( details ) => {
                        if( details ){
                            let slope = details.m
                            let coords = details.c
                            if( slope != 0 && slope != "Infinity" ){
                                //The line is a diagonal
                                //Promise finding line
                                return await checkCoordsWithSlope( img, coords, dot, tod )  
                                    
                            }else{
                                //Promise finding line
                                return await checkCoords( img, coords, dot, tod )   
                            }//Line checked m == 1 or Infinity or none  
                        }else{
                            return null
                        }
                    } )
                    .then( ( adjacency ) => {
                        console.log("Edge found: ", adjacency)
                        if( adjacency ){
                            let dname = gn(adjacency.h, adjacency.k)
                            let destinyNode = tng.getNode( dname )
                            //
                            originNode.addEdge( destinyNode )
                        }
                    } )
                    .catch( err => {
                        console.log("Obstacle found:", err, details.m)
                    } )
                    .catch( (message) => {
                        console.log(message)
                    })
                    console.log("JUST ENDED ONE")
            }//Destiny circle
        }//Origin circle
        console.log("ENDED ALL")
        resolve ( tng );
    } )
    
}
//
drawEdges = ( g, i ) => {
    let drawn = []
    for (const n of g.nodes) {
        if( n!= null ){
            for (const e of n.edge) {
                let valid = notChecked( n.name, e.name, drawn )
                    .then( async ( res ) => {
                        drawn.push(res)
                        let middlecoords = await getLineCoords( n.circle.h, n.circle.k, e.circle.h, e.circle.k )
                        return middlecoords
                    } )
                    .catch( (err) => console.log("Err: ", err) )
               
                    .then( (coords) => {
                        let c = coords.c
                        for ( const dot of c ) {
                            let index = getIndex( dot.x, dot.y, i.width )
                            // console.log( 
                            //     img.pixels[index], 
                            //     img.pixels[index+1],
                            //     img.pixels[index+2]
                            // )
                            setP( i, index, 0, 79, 83 )
                            i.updatePixels();
                            background(i);
                            for (const ob of i.someFigure) {
                                fill( 255, 255, 255, 150 )
                                stroke( 0, 255, 255, 150 )
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
                                rect( ob.ropeA.x1, ob.ropeA.y1, ob.ropeB.x2-ob.ropeA.x1, ob.ropeB.y2-ob.ropeA.y1 )
                            }
                        }
                    } )
                    .catch( mssg => console.log(mssg) )
            }
        }
    }   
}
//
notChecked = ( oname, dname, drawn ) => {
    console.log("checking names", oname, dname )
    return new Promise( (resolve, reject) => {
        if( lineChecked( drawn, oname, dname ) ){
            reject( "Alredy drawn" )
        }else{
            let path = {
                o: oname,
                d: dname
            }
            resolve( path )
        }
    } )
}
//PLACE NAMES OF CIRCLES
drawText = ( g ) => {
    for (const c of g.nodes) {
        if( c != null ){
            textSize( 18 );
            // fill( 29, 29, 27 );
            // stroke( 0, 79, 83 );
            stroke( 18, 245, 254 );
            fill( 0, 79, 83 );
            text( c.name, c.circle.h, c.circle.k + c.circle.radius);
        }
    }
}

//
addPredator = () => {
    $('#vertexOptions').hide()
    let p = new Predator( oh, ok )
    predators.push( p )
}

//
drawGraph = ( g, i ) => {
    // drawEdges( g, i )
    drawClosest( g )
    drawText( g )
    console.log("New graph drawn")
    console.log(g)
}

//
deleteVertex = (  ) => {
    $('#vertexOptions').hide()
    // var r = confirm("Quieres borrar el vertice: " + oh + ", "+ ok);
    // if (r == true) {
    let name = gn( oh, ok );
    gg.deleteNode( name );
    console.log(gg)
    graph = gg;
    kk.loadImage("src/img/"+ imageName +".png", ( i ) => {
        i.loadPixels()
        drawGraph( graph, i )
        sortAndShow( graph )
    });
    // } else {
        // window.alert("NOTHING DONE");
    // }
    // $('#vertexOptions').load('./src/components/vertexOptions/vertexOptions.html')
}

//
cancelOption = () => {
    $('#vertexOptions').hide()

}