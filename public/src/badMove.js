move = ( graph ) => {
        if( this.arrived() ) {
            console.log( "DEST CHANGED: "+this.destx+","+this.desty )
            console.log( "DEST CHANGED: "+this.destx+","+this.desty )
            console.log( "DEST CHANGED: "+this.destx+","+this.desty )
            this.pickPath( graph ) 
        }else{
            console.log(this.x+","+this.y+" obviuously is not "+this.destx+","+this.desty)
        }
        let ox = this.originx
        let oy = this.originy
        let dx = this.destx
        let dy = this.desty
        let end
        console.log("________________________________________")
        console.log("stage: "+ this.stage)
        console.log("x: "+ this.x + "destx" + this.destx)
        console.log("y: "+ this.y + "desty" + this.desty)
        //Get coordinates
        let coords = getLineCoords( ox, oy, dx, dy ).c
        console.log( "Coords size: " )
        console.log( coords.length-1 )
        // console.log( coords )
        /** */

        if( ox == coords[ coords.length-1 ].x && oy == coords[ coords.length-1 ].y ){
            //If starting in the last element. Go backwards
            console.log("STARTING BACKWARDS")
            end = 0  //Some cost
            console.log("End: " + end)
            if( this.stage == null ){
                this.stage = coords.length-1
                console.log("pos según si..."+this.stage)
            }else{
                console.log("k kk"+this.stage)
            }
            if( this.stage != end ) {
                this.stage -= 1
                if( this.stage == end ) {
                    if( this.arrived() ) { this.pickPath( graph ) }
                }else{
                    this.x = coords[this.stage].x
                    this.y = coords[this.stage].y
                }
            }
        }else{
            end = coords.length-1
            console.log("End: " + end)
            if( this.stage == null ){
                this.stage = 0
            }
            if( this.stage != end ) {
                this.stage += 1
                if( this.stage == end ) {
                    if( this.arrived() ) { this.pickPath( graph ) }
                }else{
                    this.x = coords[this.stage].x
                    this.y = coords[this.stage].y
                }
            }
        }
        
        


    }