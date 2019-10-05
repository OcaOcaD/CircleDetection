class Graph{
    constructor(){
        this.nodes = []
        this.graph = {}
        this.name = ""
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
    getNode( name ){
        return this.graph[name];
    }
    deleteNode = ( name ) => {
        // console.log(name)
        for (let i in this.nodes) {
            if( this.nodes[i] != null ){
                // console.log(this.nodes[i].name + " == " + name)
                if( this.nodes[i].name == name ){
                    // console.log("should delete the node: " + i)
                    this.nodes[i] = null
                }
            }
        }
        this.graph[name] = null
        let aux = this.nodes.filter( (pInCheck) => pInCheck != null )
        this.nodes = aux
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
}