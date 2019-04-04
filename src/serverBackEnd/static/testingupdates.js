function test(i){
    this.x = true
    if (i >7){
        this.x = false
    }
    return this.x
}

function main(){
    this.radius = 14
    var fuck = [1,2,3,4,5,6,7,8,9,10]
    for (var i of fuck){
        console.log(test(i))
    }
}
main()