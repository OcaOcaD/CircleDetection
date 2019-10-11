class Graph{
    constructor(){
        // this.nodes = []
        this.graph = {}
        this.name = ""
        this.nodes = []
        console.log("New nodes", this.nodes)
    }
    addNode = ( node ) => { 
        //Adding the node to the graph   
        let n = new Node( node )
        this.nodes.push( n )     
        let name = n.name;
        //Making the new node name a reference to the Node itself
        this.graph[name] = n;
        return name
    }
    exists = ( name ) => {
        for (const n of this.nodes) {
            if( n.name == name )
                return name
        }
        return false
    }
    getNode( name ){
        return this.graph[name];
    }
    deleteNode = ( name ) => {
        // console.log(name)
        for (let i in this.nodes) {
            // if( this.nodes[i] != null ){
                for( let j in this.nodes[i].edge ){
                    if( this.nodes[i].edge[j].name == name ){
                        this.nodes[i].edge[j] = null
                    }
                }
                // console.log(this.nodes[i].name + " == " + name)
                if( this.nodes[i].name == name ){
                    // console.log("should delete the node: " + i)
                    this.nodes[i] = null
                }
            // }
        }
        this.graph[name] = null
        let aux = this.nodes.filter( (pInCheck) => pInCheck != null )
        this.nodes = aux
        for (let i in this.nodes) {
            let edgeaux = this.nodes[i].edge.filter( eInCheck => eInCheck != null )
            this.nodes[i].edge = edgeaux
        }
        
    }
    buildEdgesCoordinates = () => {
        for (let i in this.nodes) {
            this.nodes[i].buildEdgesCoordinates()
        }
    }
    //Get minumum cost of all the edges in a graph
    getMinimumCost = () => {
        let min = Infinity
        for (const n of this.nodes) {
            for (const e of n.edge) {
                // let cost = e.getCost()
                // console.log(e.edgeCoords)
                // console.log(e.edgeCoords.lenght)
                for (const c of e.edgeCoords) {
                    let cost = c.length
                    // console.log( n.name + "->" + e.name + " COST =" + cost )
                    if( cost < min )
                        min = cost
                }
            }
        }
        return min
    }
    //Draw Circles and lines  of the graph
    draw(){
        setColor( r, dr )
        for (const n of this.nodes) {
            circle( n.circle.h, n.circle.k, (n.circle.radius-1)*2 )
            for (const e of n.edge) {
                line( n.circle.h, n.circle.k, e.circle.h, e.circle.k )
            }
        }
    }
    text(){
        for (const c of this.nodes) {
            if( c != null ){
                textSize( 18 );
                setColor( grey, white )
                text( c.name, c.circle.h, c.circle.k + c.circle.radius);
            }
        }
    }
    sortByRadius(){
        let nodes = this.nodes
        let temp
        for ( var some = 0; some < nodes.length; some++ ) {
            for ( var i = 0; i < nodes.length-1; i++ ) {
                let j = i+1;
                let first = nodes[i].circle;
                let second = nodes[j].circle;
                if ( first.radius > second.radius ){
                    temp = nodes[i];
                    nodes[i] = nodes[j];
                    nodes[j] = temp;
                }
            }
        }
        return nodes
    }
}