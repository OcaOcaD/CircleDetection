class pCircle{
    constructor(){
        this.ropeA = { 
            x1: null,
            x2: null,
            y1: null,
            y2: null
        }
        this.ropeB = { 
            x1: null,
            x2: null,
            y1: null,
            y2: null
        }
        this.h = null;
        this.k = null;
        this.radius = null;
        this.coordinates = [];
    }
    getRadius = ()=> this.radius
    findCenter = () => {
        let cenx = ((this.ropeA.x2 - this.ropeA.x1) / 2 ) + this.ropeA.x1;
        let ceny = ((this.ropeB.y2 - this.ropeB.y1) / 2 ) + this.ropeB.y1;
        this.h = Math.round( cenx );
        this.k = Math.round( ceny );
    }
    buildCoordinates = ( img ) => {
        let ax1 = this.h - this.radius;
        let ay1 = this.k - this.radius;
        let ax2 = this.h + this.radius;
        let ay2 = this.k + this.radius;
        let accuracy = 1;
        console.log("building coords")
        // console.log("Radius = "+ this.r)
        for ( let i = ax1; i <= ax2; i+= 0.5 ){
            for ( let j = ay1; j <= ay2; j+= 0.5 ){
                ////Circle ecuation to find distance from the point to the center
                //// (x - h)^2 + ( y - k )^2 = r^2
                //  //let dist = (Math.pow( i - this.h, 2 ) + Math.pow( j - this.k, 2 ))
                let distTo = distancee(i,j, this.h, this.k);
                //console.log("Messuring: " + i + ", "+ j + " the distance is "+ distTo);

                if( this.radius - accuracy  <= distTo && distTo <= this.radius + accuracy  ){
                    //console.log( i + ", "+ j + " IS PART OF THE CIRCLE");
                    //this.coordinates.push([i,j]);
                    this.coordinates.push([i-1,j-1]);
                    let index = getIndex( i-1, j-1, img.width );
                    console.log("coloreando jaja");
                    setP( img, index, 255, 255, 255 );
                }
            }
        }
    }
}