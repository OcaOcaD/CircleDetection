class Graph{
    constructor(){
        this.nodes = [];
        this.graph = {};
        this.name = "";
    }
    exists = ( name ) => {
        let hola = this.getNode( name );
        console.log( hola );
    }
    addNode = ( node ) => { 
        //Adding the node to the graph   
        let n = new Node( node );
        this.nodes.push( n );        
        let name = n.name;
        //Making the new node name a reference to the Node itself
        this.graph[name] = n;
        console.log(n);
        return name;
    }
    getNode( name ){
        return this.graph[name];
    }
}