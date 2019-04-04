const color = require('./colordetect');
test('"blue" is 0,0,255',() =>{
    expect(colordetect("blue").toBe(color(0,0,255)));
});