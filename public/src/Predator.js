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
    }
    arrived = () => {
        return ( this.x == this.destx && this.y == this.desty ) ? true : false
    }
    setDestination = ( graph ) => {
        if( this.destx == this.desty && this.destx == null ) {
             this.pickPath( graph ) 
             this.stage = 0
        }
    }
    move = ( graph ) => {
        if( this.arrived() ) {
            console.log( "DEST CHANGED: " )
            this.pickPath( graph ) 
        }else{
            console.log(this.x+","+this.y+" obviuously is not "+this.destx+","+this.desty)
        }
        let ox = this.originx
        let oy = this.originy
        let dx = this.destx
        let dy = this.desty
        let actualx = this.destx
        let actualy = this.desty
        let step = this.stage
        console.log("________________________________________")
        let newSet = {}
        let coords = getLineCoords( ox, oy, dx, dy ).c
        if( ox == coords[ coords.length-1 ].x && oy == coords[ coords.length-1 ].y ){
            newSet = handleBackMove( coords, step, actualx, actualy )
        }else{
            newSet = handleMovement( coords, step, actualx, actualy )
        }
        this.x = newSet.x
        this.y = newSet.y
        this.stage += 1
    }
    pickPath = ( graph ) => {
        let name           = gn( this.x, this.y )
        let nuOrigin       = graph.getNode( name )
        this.originx = this.x
        this.originy = this.y
        let edgesAvailable = nuOrigin.edge.length - 1
        let random         = Math.round( Math.random() * (+edgesAvailable - +0) + 0 )
        let edge           = nuOrigin.edge[random]
        this.destx = edge.circle.h
        this.desty = edge.circle.k
        this.stage = 0
    }
}

