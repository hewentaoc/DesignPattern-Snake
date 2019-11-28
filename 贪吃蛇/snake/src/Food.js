
var createFood = function () {

    var x = null;
    var y = null;
    var flag = true;
    while( flag ){
        var isReturn = true;
        x = 1 + Math.floor(Math.random() * 28);
        y = 1 + Math.floor(Math.random() * 28);
        for(var snake = osnake.head ; snake ; snake = snake.next){
            if(snake == oground.squareArr[y][x] ){
                isReturn = false;
                break;
            }
        }
        if(isReturn){
            flag = false;
        }
    }
    var ofood = SquareFactory.create('Food', x , y ,'transparent');
    oground.remove(x , y);
    oground.append(ofood);
}


