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
}