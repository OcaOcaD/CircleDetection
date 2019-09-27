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
        let x_c;
        console.log("Calculando las y");
        //La diferencia de X es mayor calculamos las y
        if( y2 >= y1 ){
            ymax = y2;
            ymin = y1;
            xmax = x2;
            xmin = x1;
            console.log("caso 1");
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
            console.log("caso 2");
            if( xmax < xmin ){
                ymax = y2;
                ymin = y1;
                xmax = x2;
                xmin = x1;
            }
        }
        console.log("xmax : " + xmax)
        console.log( "xmin : " +  xmin)
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
        //La diferencia de Y es mayor. Calculamos las x
        let x_c;
        console.log("Calculando las x");
        if( x2 >= x1 ){
            ymax = y2;
            ymin = y1;
            xmax = x2;
            xmin = x1;
        }else{
            ymax = y1;
            ymin = y2;
            xmax = x1;
            xmin = x2;
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
    a = getCoordinates( 100, 400, 600, 80 );

    b = getCoordinates( 100, 400, 600, 80 );
    console.log(a);
}
draw = () => {
    background( 69 );
    stroke(0,0,255);
    line( 100, 400, 490, 80 );
    
}