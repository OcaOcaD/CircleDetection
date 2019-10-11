class Prey{
    constructor( x, y ){
        this.x = x
        this.y = y
        this.size = 16
    }
    draw(){
        setColor( [255, 255, 69], [255, 255, 69] )
        let x = this.x
        let y = this.y
        let h = this.size/2
        triangle( 
            x  , y-h,
            x-h, y+h,
            x+h, y+h
        )
    }
}