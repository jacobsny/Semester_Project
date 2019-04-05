var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var jacob = why(this.response);
            printer(jacob)

        }
    };
    xhttp.open("GET", "/playerupdate");
    xhttp.send();


function why(x){
    var converted = JSON.parse(x)
    return converted
}

function printer(x){
    console.log(10)
    return x
}

