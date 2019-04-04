templists = {"one": [420, 120], "two": [120, 420], "three": [320, 120]};


function themcircles(x){ //so the x is going to be a json with a list of dots... go figure//
    this.minidot = function(){
        if (this.k1 === true){
            this.templists.pop("one");
            ellipse(40, 40, 90, 90);
        }
        if (this.k2 == true){
            this.templists.pop("two");
            ellipse(40, 40, 90, 90);
        }
        if (this.k3 == true){
            this.templists.pop("three");
            ellipse(40, 40, 90, 90);
        }

        for (var ind in templists) {
            fill(color(122, 0, 122))
            var i = templists[ind]
            ellipse(i[0], i[1], 10, 10);
            //console.log(ind[0])//
        }
    }
}