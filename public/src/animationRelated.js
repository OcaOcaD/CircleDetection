/***SOME PREDATOR FUCNTIONS */
drawPredators = ( g ) => {
    rectMode(CENTER)
    setColor( r, dr )
    for (let i in predators) {
        predators[i].setDestination( g )
        predators[i].draw()
    }
    rectMode(CORNER)
}
movePredators = ( g ) => {
    for (let i in predators) {
        predators[i].move( g )
    }
}
handleBackMove = ( coords, step ) => {
    coords.reverse()
    return {
        x : coords[step].x,
        y : coords[step].y
    }
}
handleMovement = ( coords, step ) => {
    return {
        x : coords[step].x,
        y : coords[step].y
    }
}
/**/
drawPreys = () => { preys.map( p => p.draw() ) }