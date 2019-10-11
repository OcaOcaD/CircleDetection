class Predator{
    constructor(x, y){
        //Attributes
        this.x = x  //position  
        this.y = y  //position
        this.originx = x
        this.originy = y
        this.eaten   = 0
        //Shape attributes
        this.size    = 40
        this.peaks   = this.eaten + 5
        this.radius1 = 15
        this.radius2 = 5
        //Movement attributes
        this.destx = null
        this.desty = null
        this.stage = 0
        this.parked = false  //Can't move
    }
    arrived = ( pathSize, step ) => {
        // return ( this.x == this.destx && this.y == this.desty ) ? true : false
        return ( step == pathSize ) ? true : false;
    }
    setDestination = ( graph ) => {
        if( this.destx == this.desty && this.destx == null ) {
            this.destx = this.x
            this.desty = this.y
            this.stage = 0
            this.pickPath( graph ) 
        }
    }
    move = ( graph ) => {
        if( this.parked ) return false  //If parked. Don't move
        let ox = this.originx
        let oy = this.originy
        let dx = this.destx
        let dy = this.desty
        let step = this.stage
        // console.log("________________________________________")
        let newSet = {}
        getLineCoords( ox, oy, dx, dy )
            .then( (coordsResolved) => {
                let coords = coordsResolved.c
                if( ox == coords[ 0 ].x && oy == coords[ 0 ].y )
                    newSet = handleMovement( coords, step )
                else
                    newSet = handleBackMove( coords, step )
                this.x = newSet.x
                this.y = newSet.y
                this.stage += 1
                if( this.arrived( coords.length, this.stage ) )
                    this.pickPath( graph ) 
            } )
    }
    pickPath = ( graph ) => {
        console.log("NEW ORIGIN (old dest): ", this.destx, this.desty)
        let name     = gn( this.destx, this.desty )
        let nuOrigin = graph.getNode( name )
        this.originx = this.destx
        this.originy = this.desty
        let edgesAvailable = nuOrigin.edge.length - 1
        if( edgesAvailable+1 > 0 ){
            let random         = Math.round( Math.random() * (+edgesAvailable - +0) + 0 )
            let edge           = nuOrigin.edge[random]
            this.destx = edge.circle.h
            this.desty = edge.circle.k
            this.stage = 0
        }else{
            this.park()
        }
    }
    park(){
        this.parked = true
    }
    //Drawing a "Star" in the position of the node
    draw = () => {
        setColor( white, b )
        if( this.parked )
            setColor( white, db )
        let angle = TWO_PI / this.peaks;
        let halfAngle = angle / 2.0;
        beginShape();
        for ( let a = 0; a < TWO_PI; a += angle ) {
            let sx = this.x + cos(a) * this.radius2;
            let sy = this.y + sin(a) * this.radius2;
            vertex(sx, sy);
            sx = this.x + cos( a + halfAngle ) * this.radius1;
            sy = this.y + sin( a + halfAngle ) * this.radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}

