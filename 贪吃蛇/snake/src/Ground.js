
/* 
  初始化游戏场景*/

var oground = new Ground(100, 100, XLEN * SQUAREWIDTH , YLEN * SQUAREWIDTH);
/* 
 游戏场景样式初始化 */
Ground.prototype.init = function (){
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#dbdbdb';
    document.body.appendChild(this.viewContent);

    this.squareArr = [];
    /* 
      [
        [{},{},{},...]
        [{},{},{},...]
        [{},{},{},...]
        ...
      ]
      使用二维数组存储每个方块的对象
      根据不同的位置创建不同的对象
      */

    /* 
     游戏围墙为地板的初始化*/
    for(var y = 0 ; y<YLEN ; y++){
       this.squareArr[y] = new Array(YLEN);
        for(var x = 0 ; x < XLEN ; x++){
            if( y == 0 || y == YLEN - 1 || x == 0 || x== XLEN - 1){
                var newSquare = SquareFactory.create('Stone' ,x , y ,'#fff');
            }else{
                var newSquare = SquareFactory.create('Floor' ,x , y ,'#dbdbdb');
            }
            this.viewContent.appendChild(newSquare.viewContent);
            /* 
            存储方块的对象的数组 */
            this.squareArr[y][x] = newSquare;
        }
    }
    // console.log(this.squareArr)
}



/* 
  游戏场景中移除地板 */
oground.remove = function ( x , y) {
  /* 在视觉上移除地板 */
  var dom = this.squareArr[y][x].viewContent;
  this.viewContent.removeChild(dom);

  /* 在二维数组中移除对应的对象 */
  this.squareArr[y][x] = null;

}
/* 
  游戏场景中添加地板 */
oground.append = function (square) {
  /* 在对应坐标中添加对象 */
  this.squareArr[square.y][square.x] = square;

  /* 在页面添加对应的dom */
  this.viewContent.appendChild(square.viewContent);
}

// oground.remove(1 , 1);
// var mySquare = SquareFactory.create('Food', 1, 1, 'red');
// oground.append(mySquare);