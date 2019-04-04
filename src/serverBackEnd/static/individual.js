k1 = false;
k2 = false;
k3 = false;
function compare(x, y){
    this.dotonex = 420;
    this.dotoney = 120;
    this.dottwox = 120;
    this.dottwoy = 420;
    this.dotthreex = 320;
    this.dotthreey = 120;

    if ((x <= 460 && x >= 440) && (y<=460 && y>=440)){
        return false
    }
    else if (((x <= (this.dotonex+10) && x>=(this.dotonex-10)) && (y <= (this.dotoney+10)&& y>=(this.dotoney-10))) && (this.k1 == false)){
        this.k1 = true;
        return this.k1
    }
    else if (((x <= (this.dottwox+10) && x>=(this.dottwox-10)) && (y <= (this.dottwoy+10)&& y>=(this.dottwoy-10))) && (this.k2 == false)){
        this.k2 = true;
        return this.k2
    }
    else if (((x <= (this.dotthreex+10) && x>=(this.dotthreex-10)) && (y <= (this.dotthreey+10) && y>=(this.dotthreey-10))) && (this.k3 == false)){
        this.k3 = true;
        return this.k3
    }
    else{
        return false
    }

}

function User(colorpalet, x, y, z, id){
    this.loca = createVector(x, y);
    this.radius = 2;
    this.up = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.loca.x, this.loca.y - 2, this.radius*2, this.radius*2);
        this.loca.y = this.loca.y - 2
        if(compare(this.loca.x, this.loca.y) == true){
            this.radius = this.radius + 10
        }
    }
    this.down = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.loca.x, this.loca.y + 2, this.radius*2, this.radius*2);
        this.loca.y = this.loca.y + 2
        if(compare(this.loca.x, this.loca.y) == true){
            this.radius = this.radius + 10
        }
    }

    this.left = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.loca.x-2, this.loca.y, this.radius*2, this.radius*2);
        this.loca.x = this.loca.x - 2
        if(compare(this.loca.x, this.loca.y) == true){
            this.radius = this.radius + 10
        }

    }
    this.right = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.loca.x + 2, this.loca.y, this.radius*2, this.radius*2);
        this.loca.x = this.loca.x + 2
        if(compare(this.loca.x, this.loca.y) == true){
            this.radius = this.radius + 10
        }

    }
    this.show = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.loca.x, this.loca.y, this.radius*2, this.radius*2);
        if(compare(this.loca.x, this.loca.y) == true){
            this.radius = this.radius + 10
        }

    }

}


function colordetect(colorpalet){
    if (colorpalet == "blue") {
        var cols = color(0, 0, 255)
    }
    if (colorpalet == "yellow") {
        var cols =color(247, 255, 0)
    }
    if (colorpalet == "magenta") {
        var cols =color(255, 0, 222)
    }
    if (colorpalet == "cyan") {
        var cols =color(54, 247, 288)
    }
    if (colorpalet == "red") {
        var cols =color(255, 0, 0)
    }
    if (colorpalet == "green") {
        var cols =color(0, 255, 0)
    }
    return cols
}

module.exports = colordetect;
