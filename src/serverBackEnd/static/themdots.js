function themcircles(){ //so the x is going to be a json with a list of dots... go figure//
    this.minidot = function(food){
        for (var ind in food) {
            fill(color(122, 0, 122))
            var i = food[ind]
            ellipse(i[0], i[1], 10, 10);
            //console.log(ind[0])//
        }
    }
    this.otherplayers = function(players){
        for (var ind in players) {
            fill(color(22, 33, 122))
            var i = players[ind]
            ellipse(i[0], i[1], 20, 20);
            //console.log(ind[0])//
        }
    }
}