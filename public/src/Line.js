class Line{
    constructor( a, b, c, d ){
        this.x1 = a;
        this.y1 = b;
        this.x2 = c;
        this.y2 = d;
        //Slope m = (y2 - y1) / (x2 - x1)
        this.m = (this.y2 - this.y1) / (this.x2 - this.x1);
        //Properties for line eacuation ax + by + c = 0
        this.a = null;
        this.b = null;
        this.c = null;
        //Bidimentional array that contains AAAALL the points that the line is gonna touch
        this.coordinates = [];
        this.buildCoordinates();
    }
    showCoordinates = () => console.log(this.coordinates)
    // y - y1 = m(x - x1)
    /////// ( y - y1 ) / m = x - x1
    /////// ( ( y - y1 ) / m ) + x1 = x
    // x = ( ( y - y1 ) / m ) + x1 

    //y = m * ( x - x1 ) + y1
    //
    buildCoordinates = () => {
        console.log("HOLAAAAA A");
        console.log("this x1: "+this.x1);
        console.log("this x2: "+this.x2);
        let m = this.m
        let x;
        let endx;
        //Check for the minor x
        if ( this.x1 <= this.x2 ){
            console.log( "x1 es menor :)");
            x = this.x1;
            endx = this.x2;
        }else{
            console.log( "x2 es menor :)");
            x = this.x2;
            endx = this.x1;
        }
       
        console.log("start: "+ x+ " END: "+endx);
        while( x <= endx ){
            let coord_y = m * ( x - this.x1 ) + this.y1;
            this.coordinates.push([x,coord_y]);
            x++;
        }
        let y;
        let endy;

        //Check for the minor y
        if ( this.y1 <= this.y2 ){
            y = this.y1;
            endy = this.y2
        }else{
            y = this.y2;
            endy = this.y1
        }
        while( y <= endy ){
            let coord_x = ( ( y - this.y1 ) / m ) + this.x1;
            if ( this.coordinates.includes([coord_x,y]) ){
                console.log("Ya lo tiene")
            }else{
                console.log(">:c");
                this.coordinates.push([coord_x,y])
            }
            y++;
        }
    }


}