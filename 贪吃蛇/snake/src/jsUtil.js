/* 
    用来写常用的工具方法
*/

var tools = {
    /*
       继承原型的方法  */
    inheirt: function (target, origin) {
        target.prototype.__proto__ = origin.prototype;
    },
    /* 
        继承原型和私有属性的方法 
        call、apply的使用是调用对方所有方法--没得选择
        所以使用call、apply是必须本身需求涵盖对方所有方法
        利用别人的方法实现自己的功能*/
    extends: function (parent) {
        var result = function () {
            parent.apply(this, arguments);
        }
        this.inheirt(result, parent);
        return result;
    },
    /* 
      单列模式 返回同一个不同构造函数使用同一个this对象 
      但是返回的还是一个构造函数 
      只是构造函数的this是同一个对象*/
    /* 
        将Son构造函数中产生的this对象传过去
        传过去的是一个对象
        通过call、apply改变Father中的this指向
        在Father中操作的this就是Son中的this
        所以在Father中 this.name = name  this.age = age
        此时Son中的this = {
            name:'hwt',
            age : 23
        }
        */  
    single: function (parent) {
        var singleFunc = (function(){
            var instnce;
            return function () {
                if( typeof instnce == 'object'){
                    return instnce;
                }
                instnce = this;
                parent && parent.apply(this,arguments);
            }
        }())
        parent && this.inheirt( singleFunc, parent);
        /*
         singleFunc才是返回的构造函数  */
        return singleFunc;
    }
}



// var Ground = tools.single(Square);
// var oground1 = new Ground(1, 1, 100, 100);
// var oground2 = new Ground(2, 2, 100, 100);