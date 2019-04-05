templists = [[420, 120], [120, 420], [320, 120]];
function themcircles(x){ //so the x is going to be a json with a list of dots... go figure//
    if (k1 == true){
        templists = [[120,420], [320, 120]]
    }
    if (k2 == true){
        templists = [[420,120], [320, 120]]
    }
    if (k3 == true){
        templists = [[420,120], [120, 420]]
    }
    this.minidot = function(){
        for (var ind in templists) {
            fill(color(122, 0, 122))
            var i = templists[ind]
            ellipse(i[0], i[1], 10, 10);
            //console.log(ind[0])//
        }
    }
}