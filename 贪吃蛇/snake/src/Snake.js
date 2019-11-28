var osnake = new Snake();

/* 蛇的运动方向 */
var SNAKEDIRCRION = {
    RIGHT:{
        x: 1,
        y: 0,
        dir:'right'
    },
    LEFT:{
        x: -1,
        y: 0,
        dir:'left'
    },
    TOP:{
        x: 0,
        y: -1,
        dir:'top'
    },
    DOWN:{
        x: 0,
        y: 1,
        dir:'down'
    }
}
osnake.init = function (ground) {
    /* 创建蛇 */
    /* 创建蛇头 */
    var SnakeHead = SquareFactory.create('SnakeHead',3 , 1 ,'transparent');
    ground.remove(SnakeHead.x , SnakeHead.y);
    ground.append(SnakeHead)

    /* 创建两节蛇身 */
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2 , 1 , '#2c2c2c');
    ground.remove(SnakeBody1.x , SnakeBody1.y);
    ground.append(SnakeBody1)

    var SnakeBody2 = SquareFactory.create('SnakeBody', 1 , 1 , '#2c2c2c');
    ground.remove(SnakeBody2.x , SnakeBody2.y);
    ground.append(SnakeBody2)
    
    /* 记录蛇头、蛇尾对象 */
    this.head = SnakeHead;
    this.tail = SnakeBody2;

    /*使用双向链表
      将蛇头和蛇身串联起来
      SnakeHead.last--> null
      SnakeHead.next--> SnakeBody1 */
    
    SnakeHead.last = null;
    SnakeHead.next = SnakeBody1;

    SnakeBody1.last = SnakeHead;
    SnakeBody1.next = SnakeBody2;

    SnakeBody2.last = SnakeBody1;
    SnakeBody2.next = null;

    this.diretion = SNAKEDIRCRION.RIGHT;
    var headDom = document.getElementsByClassName('snakehead')[0];
    headDom.style.transform = 'scale(1.2) rotate(0deg)';
}

/* 
  策略模式对象、
  管理算法方法
*/
/* 
 控制蛇的移动 --> move 方法
 控制蛇吃食物 --> eat  方法
 蛇撞墙方法   --> die  方法*/
osnake.Strategies = {
    move:function (ground , square ,osnake , isFromeat) {
        /* 
          在原来蛇头的位置添加一节蛇身*/
        var newSnakeBody = SquareFactory.create('SnakeBody', osnake.head.x , osnake.head.y , '#2c2c2c');
        ground.remove(osnake.head.x , osnake.head.y);
        ground.append(newSnakeBody);

        /* 
          在蛇头下一步要走的位置处加一个新的蛇头 */
        var newSnakeHead = SquareFactory.create('SnakeHead', square.x , square.y ,'transparent')
        ground.remove( square.x , square.y );
        ground.append( newSnakeHead );

        /* 
          建立新的蛇联系 */

        /*  
          新创建的蛇身连接以前的蛇身 */
          newSnakeBody.last = null;
          newSnakeBody.next = osnake.head.next;
          newSnakeBody.next.last = newSnakeBody;

        /*  
          新创建的蛇头连接新创建的蛇身*/
          newSnakeHead.last = null;
          newSnakeHead.next = newSnakeBody;
          newSnakeBody.last = newSnakeHead;

        /* 从新记录此时的蛇头、蛇尾 */
          osnake.head = newSnakeHead;

        if( !isFromeat ){
            /* 去掉最后蛇尾 */
            var SnakeTail = osnake.tail.last;
            SnakeTail.next = null;
            var newFloor = SquareFactory.create('Floor',osnake.tail.x, osnake.tail.y , '#dbdbdb')
            ground.remove(osnake.tail.x, osnake.tail.y);
            ground.append(newFloor);
            osnake.tail = SnakeTail;
        }
    },
    eat:function (ground , square ,osnake) {
        this.move(ground , square ,osnake , true);
        scoreDom.innerText = ++ogame.score;
        createFood();
    },
    die:function (ground ,square) {
        clearInterval(ogame.timer);
        ogame.die(square.name);
    }
}



/* 
  判断蛇头运动下一个要触碰的方块类型
  如果是地板类型,就正常运行 */
osnake.move = function (ground) {
    var square = ground.squareArr[this.head.y + this.diretion.y][this.head.x + this.diretion.x];
    if(typeof this.Strategies[square.touch()] == 'function'){
        this.Strategies[square.touch()](ground , square ,osnake);
    }
}
