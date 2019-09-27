p5.Image.prototype.circlesFound = [];
p5.Image.prototype.someFigure = [];
//Paint the color of a given pixel of a given canvas
setP = ( img, index, r, g, b ) => {
    img.pixels[index + 0] = r;
    img.pixels[index + 1] = g;
    img.pixels[index + 2] = b;
}
pp = (img, x, y) => {
    let index = getIndex( x, y, img.x );
    console.log("IN: " + index + " " + img.pixels[index] + ", " + img.pixels[index+1] + ", " + img.pixels[index+2] )
}

getRadius = ( img, h, k ) => {
    //Messure radius in 4 directions from the center
    let radius = [];
    let crossEdges = [];
    let cont;
    let x;
    let y;
    let index;
    //To the left
    x = h;
    y = k;
    index = getIndex( x, y, img.width );
    cont = 0;    
    while( inside( x, img.width ) && isBlack( img, index ) ){
        x--;
        cont++;
        index = getIndex( x, y, img.width );
    }
    let left = {};
    left.x = x+1;
    left.y = y;
    left.edge = "left";
    crossEdges.push( left );
    radius.push( cont );
    //To the right
    x = h;
    y = k;
    index = getIndex( x, y, img.width );
    cont = 0;
    while( inside( x, img.width ) && isBlack( img, index ) ){
        x++;
        cont++;
        index = getIndex( x, y, img.width );
    }
    let right = {};
    right.x = x-1;
    right.y = y;
    right.edge = "right";
    crossEdges.push( right );
    radius.push( cont );
    //To the TOP
    x = h;
    y = k;
    index = getIndex( x, y, img.width );
    cont = 0;
    while( inside( y, img.height ) && isBlack( img, index ) ){
        y--;
        cont++;
        index = getIndex( x, y, img.width );
    }
    let top = {};
    top.x = x;
    top.y = y+1;
    top.edge = "top";
    crossEdges.push( top );
    radius.push( cont );
    //To the BOTTOM
    x = h;
    y = k;
    cont = 0;
    index = getIndex( x, y, img.width );
    while( inside( y, img.height ) && isBlack( img, index ) ){
        y++;
        cont++;
        index = getIndex( x, y, img.width );
    }
    let bottom = {};
    bottom.x = x;
    bottom.y = y-1;
    bottom.edge = "bottom";
    crossEdges.push( bottom );
    radius.push( cont );
    let figure = {
        type: '',
        radius: '',
        ba: ''
    }
    //Check if the radius doesn't have a big difference (5px)
    figure.type = ( inTolerance( radius, 5 ) ) ? "circle" : "other"
    let rr; //Real radius
    let suma = 0;
    for (let r of radius) {
        suma += r;
    }
    rr = suma / (radius.length);
    figure.radius = rr;
    let ba = blackAround( crossEdges, img, rr );
    figure.ba = ba;
    if( rr < 10 ){
        return false;
    }else{
        return figure;
    }
    
}
checkLastPixel = function( lastX, lastY, img ){
    // index = this.getIndex( lastX, lastY,  );
    // this.setP( 80, 80, 80 );   //Green
}