
function themcircles(x){ //so the x is going to be a json with a list of dots... go figure//
    this.minidot = function(templist){
        for (ind in templist) {
            fill(color(122, 0, 122))
            var i = templist[ind]
            ellipse(i[0], i[1], 10, 10);
            //console.log(ind[0])//
        }
    }
}