class Node{
    constructor( circle ){
        this.name = gn(circle.h, circle.k);
        this.circle = circle ;
        this.edge = [];
        this.searched = false;
        this.parent = null;
    }
    edgeContains  = ( node ) => {
        //Check id the node is alredy an Edge of this node
        let edges = this.edge;
        for ( let n of edges ){
            if ( n  == node ){
                return true;
            }
        }
        return false;
    }
    addEdge = ( neighbourNode ) => { 
        if ( this.edgeContains( neighbourNode ) == false ){
            this.edge.push( neighbourNode ) 
            neighbourNode.edge.push( this );
            return true;
        }else{
            //console.log("This node, "+this.name+" alredy has "+neighbourNode.name+" as an edge ");
            return false;
        }
    }
}