function User(colorpalet, x, y){
    this.pos = createVector(x, y);
    this.radius = 64;
    this.up = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.pos.x, this.pos.y - 10, this.radius*2, this.radius*2);
        this.pos.y = this.pos.y - 10
    }
    this.down = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.pos.x, this.pos.y + 10, this.radius*2, this.radius*2);
        this.pos.y = this.pos.y + 10
    }

    this.left = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.pos.x - 10, this.pos.y, this.radius*2, this.radius*2);
        this.pos.x = this.pos.x - 10
    }
    this.right = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.pos.x + 10, this.pos.y, this.radius*2, this.radius*2);
        this.pos.x = this.pos.x + 10
    }

    this.display = function(){
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
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