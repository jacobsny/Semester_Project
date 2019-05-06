function User(colorpalet) {
    this.show = function (x, y, size) {
        stroke(255, 255, 255)
        var xy = colordetect(colorpalet);
        fill(color(xy));
        ellipse(x, y, size * 2, size * 2);
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
