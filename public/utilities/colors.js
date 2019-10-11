/*COLORS*/
var grey  = [  29,  29,  27 ]
var white = [ 255, 255, 255 ]

var lb = [ 180, 252, 255 ]
var b  = [ 18 , 245, 254 ]
var db = [ 0  ,  79,  83 ]
 
var lg = [ 234, 255, 184 ]
var g  = [ 138, 179,  31 ]
var dg = [ 43 ,  71,   0 ]
 
var lr = [ 234, 255, 184 ]
var r  = [ 255,  14,  63 ]
var dr = [  67,   0,  13 ]

var setColor = ( base, dark ) => {
    fill( dark );
    stroke( base );
}