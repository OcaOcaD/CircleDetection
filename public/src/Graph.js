class Graph{
    constructor(){
        this.nodes = [];
        this.graph = {};
        this.name = "";
    }
    addNode = ( node ) => { 
        //Adding the node to the graph   
        let n = new Node( node );
        this.nodes.push( n );        
        let name = n.name;
        //Making the new node name a reference to the Node itself
        this.graph[name] = n;
        return name;
    }
    getNode( name ){
        return this.graph[name];
    }
    deleteNode = ( name ) => {
        for (let i in this.nodes) {
            if( this.nodes[i] != null ){
                if( this.nodes[i].name == name ){
                    this.nodes[i] = null;
                }
            }
        }
        this.graph[name] = null;
    }
}