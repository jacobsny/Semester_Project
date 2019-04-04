var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    console.log(this.readyState, this.status);
    if (this.readyState == 4 && this.status == 200) {
        whyohlordyoupieceofshit = xhttp.responseText;
        console.log(whyohlordyoupieceofshit)
    }
};
xhttp.open("GET", "/newPlayerEndpoint");
xhttp.send();

function why(x){
    var converted = JSON.parse(x)
    return converted
}

function printer(x){
    console.log(10)
    return x
}

