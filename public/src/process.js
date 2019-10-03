/*Procedimiento a seguir 
    - Revisar la imagen en áreas 3 en 3 píxeles
    |    - Si se encuentra negro en el area
    |    |    - Ir hacia arriba y a la izquierda hasta encontrar pixel exacto
    |    |    - Si el pixel negro NO es parte de un circulo o obstaculo
    |    |    |    - Crear cuerdas (Unión desde un punto del perimetro del circulo a otro) horizontal y vertical
    |    |    |    - Encontrar centro
    |    |    |    - Encontrar radios hacia arriba, abajo, derecha e izqjueirda
    |    |    |    - Si el los radios son parecidos
    |    |    |    |    - Agregar circulo
    |    |    |    - Sino
    |    |    |    |    - Agregar obstaculo
    |    |    |    Fin si   //Radius parecidos
    |    |    Fin si   // está repetido
    |    Fin si // Encontró pixel negro
    Fin ciclo // Los píxeles a revisar terminaron
    - Dibuja los circulos encontrdos en un nuevo canvas
    - Mostrar radios y centros
                
*/
analize = ( img ) => {
    // Loop through the image    
    let area_size = 9;     //px^2
    let y = 0;
    let x;
    while ( y < canvasY ){
        x = 0;
        while ( x < canvasX ){
            //Start analizyng this 15px x 15px
            checkArea( x, y, img );
            x += area_size;
        }
        y += area_size;
    }
}
//Check areas of 15 px^2
checkArea = ( x, y, img ) => {
    //Check a 5 px square important spots
    let index;
    let interestingPoints = [   //3 pix en 3 pix
        {
            // Top left
            spot_x: x-3,
            spot_y: y-3
        },{
            // Top center
            spot_x: x,
            spot_y: y-3
        },{
            // Top right
            spot_x: x+3,
            spot_y: y-3
        },{
            // Left middle
            spot_x: x-3,
            spot_y: y
        },{
            // Center middle
            spot_x: x,
            spot_y: y
        },{
            // Right middle
            spot_x: x+3,
            spot_y: y
        },{
            // Left bottom
            spot_x: x-3,
            spot_y: y+3
        },{
            // center bottom
            spot_x: x,
            spot_y: y+3
        },{
            // Right bottom
            spot_x: x+3,
            spot_y: y+3
        }
    ];
    for (const point of interestingPoints) {
        if ( inside( x, img.width ) ){
            //inside x axis of the canvas
            if( inside( y, img.height ) ){
                //inside both borders
                //Visit and check each interesting spot
                index = getIndex( point.spot_x, point.spot_y, img.width );
                if ( isBlack( img, index ) ){
                    if ( notRepeated( point.spot_x, point.spot_y, img.circlesFound, img.someFigure ) ){
                        //Circle found
                        // setP( img, index, 255, 00, 0 );
                        findExactSpot( point.spot_x, point.spot_y, img );
                    }else{
                        // setP( img, index, 100, 200, 255 );
                    }
                }
            }else{
                //outside the y axis
            }
        }else{
            //outside the x axis
        }
    }
}
//
findExactSpot = ( x, y, img ) => {
    //The x and y pixel is a black one
    let index = getIndex( x, y, img.width );
    while ( isBlack( img, index ) ){
        //Go all the way to the left until no more black
        x--;
        index = getIndex( x, y, img );
    }
    // x++;
    x--;
    // index = getIndex( x, y, img.width );
    while ( isBlack( img, index ) ){
        //Go all the way to the left until no more black
        y--;
        index = getIndex( x, y, img.width );
    }
    // y++;
    //In this spot the rope should start
    drawRopes( img, x, y );
}
drawRopes = ( img, x, y ) => {
    let c = new pCircle;
    c.ropeA.x1 = x;
    c.ropeA.y1 = y;
    //missing x2
    c.ropeA.y2 = y;
    let index;
    index = getIndex( x, y, img.width );
    while ( inside( x, img.width ) && notWhite( img, index ) ){
        //Go right until no more black
        x++;
        index = getIndex( x, y, img.width );
    }
    x--;
    c.ropeA.x2 = x;     //Found x2
    index = getIndex( c.ropeA.x1, c.ropeA.x2, img.width );
    // --- BUILD THE SECOND ROPE ---
    c.ropeB.x1 = x;
    c.ropeB.y1 = y;
    c.ropeB.x2 = x;
    //c.ropeB.y2 = x;
    index = getIndex( x, y, img.width );
    while ( inside( y, img.height ) && notWhite( img, index ) ){
        //Go bottom until no more black
        y++;
        index = getIndex( x, y, img.width );
    }
    y--;
    c.ropeB.y2 = y;     //ropeB y2 found
    c.findCenter();
    let figure;
    figure = getRadius( img ,c.h, c.k );
    if( figure != false ){
        c.radius = figure.radius;   //Get the radius
        //Check if trully a circle and push it. if not add to the notCircle instead
        if ( figure.type == "circle" && figure.ba == false ){
            //Circle found
            index = getIndex( c.h, c.k, img.width );
            setP( img, index, 0, 255, 105 );    //Green pixel in the center of the circle
            img.circlesFound.push( c );         //Added to the circles array
        }else{
            //Some obstacle found
            let tol = 0;
            c.ropeA.x1 -= tol
            c.ropeA.x2 += tol
            c.ropeA.y1 -= tol
            c.ropeA.y2 += tol
    
            c.ropeB.x1 -= tol
            c.ropeB.x2 += tol
            c.ropeB.y1 -= tol
            c.ropeB.y2 += tol
            img.someFigure.push( c );           //Added to the obstacles array
        }
    }else{
        // console.log("DONUT");
    }
    
    
}
