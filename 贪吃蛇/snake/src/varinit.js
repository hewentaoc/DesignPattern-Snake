/* 
  进行常用的全局变量初始化*/
/* 
  游戏场景的宽高系数
  宽度系数 XLEN -->每行有多少个小方块
  高度系数 YLEN -->每列有多少个小方块
  */

 var XLEN = 30;
 var YLEN = 30;

 /*  
    SQUAREWIDTH --> 方块的宽高
 */

var SQUAREWIDTH = 20;

/* 
  蛇的移动速度 */

var INTERVAR = 200;


/*  
    定义所有方块的构造函数
*/
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
/* 
    用来更新单例模式*/
Square.prototype.Update = function ( x , y , color) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = y * SQUAREWIDTH + 'px';
}
/* 
  创建不同的构造函数*/
var Ground = tools.single(Square);     /* 游戏场景的构造函数 */
var Stone = tools.extends(Square);     /* 围墙的构造函数 */
var Floor = tools.extends(Square);     /* 地板的构造函数 */
var Food = tools.single(Square);       /* 食物的构造函数 */
var SnakeHead = tools.single(Square);  /* 蛇头的构造函数 */
var SnakeBody = tools.extends(Square); /* 蛇身的构造函数 */
var Snake = tools.single();            /* 蛇的抽象构造函数 */
var Game = tools.single();             /* 游戏的构造函数 */

/* 
  创造的两种蘑菇
  加分蘑菇
  减分蘑菇 */
var Mushroom = tools.extends(Square);



/* 
 DOM对象 */

 var scoreDom = document.getElementById('score');
 var table = document.getElementById('table');
 var btn = document.getElementById('btn');

/*  策略信息对象 
    不同的信息
    返回不同的内容
    从而执行不同的方法*/
var TACTICSMESSAGE = {
     MOVE:'move',
     EAT:'eat',
     DIE:'die',
}

var btnMes = {
    begin:"begin",
    pause:'pause',
    gobegin:"gobegin",
    nextbegin:'nextbegin',
}

/* 
 存储排行的列表 */
var list = [];





