var ogame = new Game();
ogame.timer = null;
ogame.score = 0;
ogame.init = function () {
    oground.init();
    osnake.init(oground);
    createFood();
    btn.onclick = function () {
        var item = this.getAttribute('item');
        btnFunc[item]()
    }
}


/* 贪吃蛇移动事件 */
function keydown(e) {
    var headDom = document.getElementsByClassName('snakehead')[0];
    // snakehead
    if(e.which == 37 && osnake.diretion != SNAKEDIRCRION.RIGHT && osnake.diretion != SNAKEDIRCRION.LEFT){

        osnake.diretion =  SNAKEDIRCRION.LEFT;
        headDom.style.transform = 'scale(1.2) rotateY(180deg)';

    }else if(e.which == 38 && osnake.diretion != SNAKEDIRCRION.DOWN && osnake.diretion != SNAKEDIRCRION.TOP){

        osnake.diretion =  SNAKEDIRCRION.TOP;
        headDom.style.transform = 'scale(1.2) rotate(-90deg)';
    }else if(e.which == 39 && osnake.diretion != SNAKEDIRCRION.LEFT && osnake.diretion != SNAKEDIRCRION.RIGHT){

        osnake.diretion =  SNAKEDIRCRION.RIGHT;
        headDom.style.transform = 'scale(1.2) rotate(0deg)';

    }else if(e.which == 40 && osnake.diretion != SNAKEDIRCRION.TOP && osnake.diretion != SNAKEDIRCRION.DOWN){
        osnake.diretion =  SNAKEDIRCRION.DOWN;
        headDom.style.transform = 'scale(1.2) rotate(90deg)';
    }
}
function debounce (handle,delay) {
    var timer ;
    return function (e){
        clearInterval(timer);
        timer = setTimeout(function () {
            handle(e);
        },delay)
    }
}

ogame.move = function () {
    this.timer = setInterval (function () {
        osnake.move(oground);
    },INTERVAR)
    
    /* 
      绑定蛇的切换方向事件*/
    document.onkeydown = debounce(keydown,0)
}

ogame.die = function (name){
    UpdateList(this.score);
    var isFlag = window.confirm('你本次得分'+ this.score+','+'是否重新开始?');
    if(isFlag){
        ogame.init();
        this.score = 0;
        scoreDom.innerText = this.score;
        btn.setAttribute('item','begin');
        btn.innerText = '开始';
        btn.classList.remove('pause');
    }else{
        btn.setAttribute('item','nextbegin');
        btn.innerText = '重新开始';
        btn.classList.remove('pause');
    }
}

ogame.init();

/* 
 不同按钮的事件*/
var btnFunc = {
    begin: function () {
        ogame.move();
        btn.setAttribute('item','pause');
        btn.innerText = '暂停';
        btn.classList.add('pause');
    },
    pause: function () {
        clearInterval(ogame.timer);
        btn.setAttribute('item','gobegin');
        btn.innerText = '继续游戏';
        btn.classList.remove('pause');
    },
    gobegin:function (){
        ogame.move();
        btn.setAttribute('item','pause');
        btn.innerText = '暂停';
        btn.classList.add('pause');
    },
    nextbegin: function(){
        ogame.init();
        ogame.move();
        ogame.score = 0;
        scoreDom.innerText =  ogame.score;
        btn.setAttribute('item','pause');
        btn.innerText = '暂停';
        btn.classList.add('pause');
    }
}