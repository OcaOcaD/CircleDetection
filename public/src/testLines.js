getCoordinates = ( x1, y1, x2, y2 ) => {
    //y = mx+B;
    let m;
    let ymax;
    let ymin;
    let xmax;
    let xmin;
    let coords = [];
    line( x1, y1, x2, y2 );
    //Calculamos las coordenadas 
    if( Math.abs(y2 - y1) < Math.abs(x2 - x1) ){
        let y_c;
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
        // y-y1 = m( x - x1 )
        // y = m( x - xmax ) + ymax
        for (let x_c = xmin; x_c < xmax; x_c++) {
            y_c = m*( x_c - xmax ) + ymax;
            let coord = {
                x: x_c,
                y: y_c
            }
            coords.push( coord );
        }
        
    }else{
        let x_c;
        //La diferencia de Y es mayor. Calculamos las x
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
        //Calculamos la pendiente
        m = (ymax - ymin) / ( xmax - xmin );
        for( let y_c = ymin; y_c < ymax; y_c++ ){
            x_c = ( ( y_c - y1 ) / m  ) + x1;
            let coord = {
                x: x_c,
                y: y_c
            }
            coords.push( coord );
        }      
    }
    // console.log("Pendiente: " + m);
    details = {
        m : Math.abs(m), 
        c : coords
    }
    return details;
}

setup = () => {
    // let hola;
    createCanvas( 500, 500 );
    // a = getCoordinates( 100, 400, 600, 80 );

    b = getCoordinates( 349, 313, 411, 72 );
    c = getCoordinates( 411, 72, 349, 313 );
}
draw = () => {
    background( 69 );
    // stroke(0,0,255);
    // line( 100, 400, 490, 80 );
    stroke(0,255,255);
    line( 349, 313, 411, 72 );
    line( 411, 72, 349, 313 );
    
}