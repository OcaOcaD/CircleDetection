//given an x and y point. Returns the actual index of that pixel in the pixels[] array
getIndex = ( x, y, w ) => (x +( y * w)) * 4;
//If a pixel is black returns true
isBlack = ( img, index ) => {
    // console.log("index:   "+ index);
    let r = img.pixels[ index+0 ];
    let g = img.pixels[ index+1 ];
    let b = img.pixels[ index+2 ];
    // console.log( "r "+r +"g "+g +"b "+b);
    if( r == g  && g == b ){
        let media = (r + g + b) / 3;
        let ans = ( media <= 254 && media != 120 ) ? true : false;
        return ans;
    }else{
        return false;
    }
}
//Returns true if a pixel is NOT white
notWhite = ( img, index ) => {
    let r = img.pixels[ index+0 ];
    let g = img.pixels[ index+1 ];
    let b = img.pixels[ index+2 ];
    // console.log( "r "+r +"g "+g +"b "+b);
    // let media = (r + g + b) != 765 && (r + g + b) != 240;
    let media = (r + g + b) != 765;
    return media;
}
//Compares a black point with actual circles and return true if is not a part of a circle
notRepeated = ( Xpot, Ypot, circlesFound, otherFigures ) => {
    for (let C of circlesFound) {
        let dist = distancee( Xpot, Ypot, C.h, C.k );
        if (  dist < C.getRadius() + 5 ){
            //Alredy part of a circle
            return false;
        }
    }
    for (let o of otherFigures) {
        let x1 = o.ropeA.x1;
        let x2 = o.ropeA.x2;
        let y1 = o.ropeB.y1;
        let y2 = o.ropeB.y2;
        tol = 0;
        if( x1 - tol <= Xpot && Xpot <= x2 + tol ){
            if( y1 - tol <= Ypot && Ypot <= y2 + tol ){
                return false;
            }
        }
    }
    return true;
}
//Checks if a value is within a0 and a given range
inside = ( dot, size ) => {
    if ( dot <= 0 || dot >= size )
        return false;
    else
        return true;
}
//Uses pitagoras and returns the distance between 2 points
distancee = ( x, y, xx, yy ) => {
    let a = x - xx;
    let b = y - yy;
    let c = Math.sqrt( a*a + b*b );
    return c;
}
outputData = ( img ) => {
    console.log("MIS CIRCULOS FUERON:")
    console.log(img.circlesFound);
    console.log("algunos obstaculos...")
    console.log(img.someFigure)
    console.log("Analisis terminado ");
}
//Check if the different values given doesn't have a difference bigger than the tolerance beetween them
inTolerance = ( values, tolerance ) => {
    for (const reference of values) {
        for (const comparing of values) {
            if ( Math.abs( reference - comparing ) > tolerance ){
                //The diference beetween the reference spot and the actual comparing value is bigger than the tolerance
                return false;
            }
        }
    }
    return true;
}
//Check 4 edges in the circle ( left, right, top, bottom. In such order ) and looks around them for black pixels
//Returns true if a  black pixel is spotted, so its not a circle.
//Returns false if all around is white, so its not a circle.
blackAround = ( crossEdges, img, radius ) => {
    let gap;
    if( radius < 30 )
        gap = 10
    if( radius >= 30 )
        gap = 20
    if( radius > 50 )
        gap = 30;
    if( radius > 100 )
        gap = 60;
    for (let edge of crossEdges) {
        let exclude = [];   //x,y
        let e = edge.edge;
        switch ( e ) {
            case "left":{
                //LEFT
                let es = {
                    x : edge.x+gap,
                    y : edge.y
                }
                exclude.push(es);
                let es2 = {
                    x : edge.x-gap,
                    y : edge.y
                }
                exclude.push(es2);
                break;
            }
            case "right":{
                //RIGHT
                let es = {
                    x : edge.x-gap,
                    y : edge.y
                }
                exclude.push(es);
                let es2 = {
                    x : edge.x+gap,
                    y : edge.y
                }
                exclude.push(es2);
                break;
            }
            case "top":{
                //TOP
                let es = {
                    x : edge.x,
                    y : edge.y+gap
                }
                exclude.push(es);
                let es2 = {
                    x : edge.x,
                    y : edge.y-gap
                }
                exclude.push(es2);
                break;
            }
            case "bottom":{
                //BOTTOM
                let es = {
                    x : edge.x,
                    y : edge.y-gap
                }
                exclude.push(es);
                let es2 = {
                    x : edge.x,
                    y : edge.y+gap
                }
                exclude.push(es2);
                break;
            }
        }
        is = [{
                // Top center
                spot_x: edge.x,
                spot_y: edge.y-gap
            },{
                // Left middle
                spot_x: edge.x-gap,
                spot_y: edge.y
            },{
                // Right middle
                spot_x: edge.x+gap,
                spot_y: edge.y
            },{
                // center bottom
                spot_x: edge.x,
                spot_y: edge.y+gap
            }];
        let index;
        for (let point of is) {
            index = getIndex( point.spot_x, point.spot_y, img.width );
            //For each of the important spots is if not excluded
            for (const ex of exclude) {
                if ( point.spot_x != ex.x && point.spot_y != ex.y  ){
                    //Now check if the pixel is black
                    // setP( img, index, 255, 55, 50 );
                    index = getIndex( point.spot_x, point.spot_y, img.width );
                    if ( isBlack( img, index ) ){
                        //Cant be black dots around a circle
                        // setP( img, index, 50, 55, 255 );
                        return true;
                    }
                }else{
                    // setP( img, index, 255, 0, 105 );
                }
            }
            
        }
    }
    return false;
}

/*
    *  THE FUNCTIONS USED IN THE DETECTING CRASHES PART  *
*/


//This functions gets the coordinates where a line cross from point A to point B
getLineCoords = ( x1, y1, x2, y2 ) => {
    let m;
    let ymax;
    let ymin;
    let xmax;
    let xmin;
    let coords = [];
    // line( x1, y1, x2, y2 );
    //Calculamos las coordenadas 
    if( Math.abs(y2 - y1) < Math.abs(x2 - x1) ){
        let x_c;
        // console.log("Calculando las y");
        //La diferencia de X es mayor calculamos las y
        if( y2 >= y1 ){
            ymax = y2;
            ymin = y1;
            xmax = x2;
            xmin = x1;
            if( xmax < xmin ){
                ymax = y1;
                ymin = y2;
                xmax = x1;
                xmin = x2;
            }
        }else{
            ymax = y1;
            ymin = y2;
            xmax = x1;
            xmin = x2;
            if( xmax < xmin ){
                ymax = y2;
                ymin = y1;
                xmax = x2;
                xmin = x1;
            }
        }
        //Calculamos la pendiente
        m = (ymax - ymin) / ( xmax - xmin );
        //y-y1 = m( x - x1 )
        //y = m( x - xmax ) + ymax
        for (let x_c = xmin; x_c < xmax; x_c++) {
            y_c = m*( x_c - xmax ) + ymax;
            y_c = Math.floor( y_c );
            let coord = {
                x: x_c,
                y: y_c
            }
            coords.push( coord );
        }
        
    }else{
        //La diferencia de Y es mayor. Calculamos las x
        let x_c;
        // console.log("Calculando las x");
        if( x2 >= x1 ){
            ymax = y2;
            ymin = y1;
            xmax = x2;
            xmin = x1;
            if( ymin > ymax ){
                ymax = y1;
                ymin = y2;
                xmax = x1;
                xmin = x2;
            }
        }else{
            ymax = y1;
            ymin = y2;
            xmax = x1;
            xmin = x2;
            if( ymin > ymax ){
                ymax = y2;
                ymin = y1;
                xmax = x2;
                xmin = x1;
            }
        }
        // console.log("ymax : " + ymax)
        // console.log( "ymin : " +  ymin)
        //Calculamos la pendiente
        m = (ymax - ymin) / ( xmax - xmin );
        for( let y_c = ymin; y_c < ymax; y_c++ ){
            x_c = ( ( y_c - y1 ) / m  ) + x1;
            x_c = Math.floor( x_c );
            let coord = {
                x: x_c,
                y: y_c
            }
            coords.push( coord );
        }      
    }
    // console.log("Pendiente: " + m);
    let details = {
        m : Math.abs(m), 
        c : coords
    }
    return details;
}

//
getNeighborhood = ( x, y ) => {
    let spots = [];
    let ystart = y-1;
    let xstart = x-1;
    for (let i = ystart; i < ystart + 3; i++) {
        for (let j = xstart; j < xstart + 3; j++) {
            let spot = {
                x: j,
                y: i
            }       
            spots.push( spot );
        }
    }
    return spots;
}

//Check if the pixel is not inside either the origi circle or the destiny circle
insideCircles = (oc, dc, x, y, tolerance) => {
    if ( distancee( oc.h, oc.k, x, y ) < ( oc.radius + tolerance ) ){
        return true;       //Inside the origin circle
    }else if( distancee( dc.h, dc.k, x, y ) < ( dc.radius + tolerance ) ){
        return true;   //Inside the destiny circle
    }else{
        return false;   //Not a part of a circle
    }
}

//
isWhite = ( img, index ) => {
    // console.log("CHEKING WHITENESS");
// console.log("index:   "+ index);
    let r = img.pixels[ index+0 ];
    let g = img.pixels[ index+1 ];
    let b = img.pixels[ index+2 ];
    // console.log( "r "+r +"g "+g +"b "+b);
    let media = (r + g + b) / 3
    let ans = ( media >= 255 )  ? true : false;
    return ans;
}

//INSIDE OBSTACLE
insideObstacle = ( obstacles, px, py ) => {
    for (const o of obstacles) {
        let x1 = o.ropeA.x1;
        let x2 = o.ropeA.x2;
        let y1 = o.ropeB.y1;
        let y2 = o.ropeB.y2;
        tol = 10;
        if( x1 - tol <= px && px <= x2 + tol ){
            if( y1 - tol <= py && py <= y2 + tol ){
                return true;
            }
        }
    }
    return false;
}

//Check pixel
checkPixel = ( img, x, y ) => {
    //True if not an obnstacle
    //False if obstacle 
    let index = getIndex( x, y, img.width );
    if( isWhite( img, index ) || insideObstacle( img.someFigure, x, y ) ){    //if not white return true
        // setP( img, index, 0, 255, 1 );
        return true;
    }else{
        setP( img, index, 255, 0, 0 );
        return false;
    }
}

//Returns a string concatenating 2 values separated by ,
gn = ( h, k ) => h + "," + k;

//
lineChecked = ( paths, oname, dname ) => {
    for (const p of paths) {
        // console.log(p);
        // console.log("oname:" + oname);
        // console.log("dname:" + dname);
        if( p.o == oname && p.d == dname ){
            // console.log(oname + " == " + p.o + " y " + dname + " == " + p.d)
            return true;
        }
        if( p.o == dname && p.d == oname ){
            // console.log(oname + " == " + p.d + " y " + dname + " == " + p.o)
            return true;
        }
    }
    // console.log("No pos no")
    return false;
}

