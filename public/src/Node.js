class Node{
    constructor( circle ){
        this.name = gn(circle.h, circle.k)
        this.circle = circle 
        this.edge = []
        this.edgeCoords = []
        this.searched = false
        this.parent = null
    }
    edgeContains  = ( node ) => {
        //Check id the node is alredy an Edge of this node
        let edges = this.edge;
        for ( let n of edges ){
            if ( n  == node ){
                return true
            }
        }
        return false;
    }
    addEdge = ( neighbourNode ) => { 
        if ( this.edgeContains( neighbourNode ) == false ){
            this.edge.push( neighbourNode ) 
            neighbourNode.edge.push( this )
            return true;
        }else{
            //console.log("This node, "+this.name+" alredy has "+neighbourNode.name+" as an edge ");
            return false;
        }
    }
    buildEdgesCoordinates = () => {
        for (const e of this.edge) {
            getLineCoords( this.circle.h, this.circle.k, e.circle.h, e.circle.k )
                .then( ( edgeCoords ) => {
                    this.edgeCoords.push( ec.c )
                } )
            
        }
    }
    getEdgeCost = ( desntinyNodeName ) => {
        for (let i in this.edge) {
            if( this.edge[i].name == desntinyNodeName ){
                return this.edgeCoords[i]
            }
        }
        return false;
    }

    // getMinimumCost = () => {
    //     for
    //     this.edgeCoords.length
    // }

}