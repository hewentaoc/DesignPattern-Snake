   /* 
    使用抽象工厂模式
    创建方法的构造函数
   */
    function SquareFactory () {

    }
    /* 
     创建不同的构造函数 */
    SquareFactory.create = function ( type ,x , y ,color ) {
        if(typeof SquareFactory.prototype[type] != 'function'){
            throw 'no the function';
        }
        /* 
          为什么要让方法的函数原型指向的工厂构造函数的原型
          因为在方法函数作为构造函数的时候
          此时的this不会像一样指向SquareFactory
          此时的this是新创建的一个对象 
          不进行原型继承的话,无法使用工厂构造函数身上的方法*/
        /* 
          我总结的方法:
          不进行原型继承、不进行new操作,为了使this指向SquareFactory
        */
        /* 
         var newSquare =  SquareFactory.prototype[type]( x , y , color);
        
        */ 
        if( SquareFactory.prototype[type].prototype.__proto__ != SquareFactory.prototype){
            SquareFactory.prototype[type].prototype = new SquareFactory();
        }
        var newSquare = new SquareFactory.prototype[type]( x , y , color);
        return newSquare;
    }
    /* 
     进行工厂创建方块对象的样式初始化*/
    SquareFactory.prototype.init = function (square , color ,mes ,name) {
        square.viewContent.style.position = 'absolute';
        square.viewContent.style.width = square.width + 'px';
        square.viewContent.style.height = square.height + 'px';
        square.viewContent.style.backgroundColor = color;
        square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
        square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
        square.viewContent.className = name.toLowerCase();
        square.name = name;

        /* 
         我总结的方法:
         也可以在该init函数将创建的方块添加到游戏场景中
         oground.viewContent.appendChild(square.viewContent);
        */
        /* 
          记录每个对象身上不同的状态
          碰到Floor 就继续MOVE
          碰到Stone 就DIE
          碰到SnakeBody 就DIE
          碰到FOOD 就EAT */
        square.touch = function () {
            return mes;
        }
    }
    /* 
     创建围墙对象的构造函数 */
    SquareFactory.prototype.Stone = function ( x , y , color) {
        var oStone = new Stone(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oStone , color , TACTICSMESSAGE.DIE ,'Stone');
        return oStone;
    }
    /* 
     创建地板对象的构造函数 */
    SquareFactory.prototype.Floor = function ( x , y , color) {
        var oFloor = new Floor(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oFloor , color , TACTICSMESSAGE.MOVE ,'Floor') ;
        return oFloor;
    }
    /* 
     创建食物对象的构造函数 */
    SquareFactory.prototype.Food = function ( x , y , color) {
        var oFood = new Food(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oFood , color , TACTICSMESSAGE.EAT, 'Food');
        oFood.Update(x , y);
        return oFood;
    }
    /* 
      创建蛇头对象的构造函数 */
    SquareFactory.prototype.SnakeHead = function ( x , y , color) {
        var oSnakeHead = new SnakeHead(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oSnakeHead , color , TACTICSMESSAGE.DIE ,'SnakeHead');
        oSnakeHead.Update(x , y);
        return oSnakeHead;
    }
    /* 
      创建蛇身对象的构造函数 */
    SquareFactory.prototype.SnakeBody = function ( x , y , color) {
        var oSnakeBody = new SnakeBody(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oSnakeBody , color , TACTICSMESSAGE.DIE ,'SnakeBody');
        return oSnakeBody;
    }
    SquareFactory.prototype.Mushroom = function ( x , y , color) {
        var oMushroom = new Mushroom(x , y , SQUAREWIDTH , SQUAREWIDTH);
        this.init( oMushroom , color , TACTICSMESSAGE.EAT, 'Mushroom');
        oMushroom.Update(x , y);
        return oMushroom;
    }
