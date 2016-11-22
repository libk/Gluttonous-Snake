/*
  20行30列
 */
var row=30;
var column=40;

var score=0;
var degree=1;
var speed=0;   //移动速度
var snakeArray=[];//保存蛇身的数组
var candy=null; //等待被吃的糖果
var timer=null;
var gameState=false; //判断游戏是否处于运行状态
var direction='left';  //默认的移动方向

window.onload=function()
{
    var oGameView=document.getElementById('game-view');
    var scoreNum=document.getElementById('score-num');  // 计分
    var degreeNum=document.getElementById('degree');   // 难度

    initSnake();
    createCandy();
    /**
     * 控制蛇移动
     * @return {[type]} [description]
     */
    function startMove()
    {
        timer=setTimeout(function()
        {
            // 判断是否撞墙
            if(snakeArray[0].column<0||snakeArray[0].column>39||snakeArray[0].row<0||snakeArray[0].row>29)
            {
                confirm('游戏结束，请按空格键继续！');
                if(true)
                {
                    location.reload();
                    clearInterval(timer);
                    return;
                }
            }

            // 判断是否撞自己
            for(var i=1;i<snakeArray.length;i++)
            {
                if(snakeArray[0].row==snakeArray[i].row&&snakeArray[0].column==snakeArray[i].column)
                {
                    confirm('游戏结束，请按空格键继续！');
                    if(true)
                    {
                        location.reload();
                        clearInterval(timer);
                        return;
                    }
                }
            }

            // 判断吃没吃到糖果
            if(snakeArray[0].row==candy.row && snakeArray[0].column==candy.column)
            {
                score++;
                degree=parseInt(score/10)+1;
                scoreNum.innerHTML=score;
                degreeNum.innerHTML=degree;
                if(degree>6)
                {
                    degree=6;
                }
                snakeArray.push(candy);
                candy=null;
                snakeArray[snakeArray.length-1].style.background='#99CC66';
                createCandy();
            }

            // 每一个蛇身子的div都跟着前一个走
            for(var m=snakeArray.length-1;m>0;m--)
            {
              snakeArray[m].row=snakeArray[m-1].row;
              snakeArray[m].column=snakeArray[m-1].column;
            }

            switch(direction)
            {
              case 'left':
                snakeArray[0].column--;
                break;
              case 'right':
                snakeArray[0].column++;
                break;
              case 'top':
                snakeArray[0].row--;
                break;
              case 'bottom':
                snakeArray[0].row++;
                break;
            }
            //对蛇身的位置进行刷新
            for(var k=0;k<snakeArray.length;k++)
            {
              setPos(snakeArray[k]);
            }

            startMove();

            speed=160-degree*20;

        },speed);

        // 判断键盘按键  37左 39右 38上 40下
        document.onkeydown=function(ev)
        {
            var oEvent=ev||event;
            var keyCode=oEvent.keyCode;

            if(keyCode==37&&direction!='right')
            {
                direction='left';
            }
            else if(keyCode==39&&direction!='left')
            {
                direction='right';
            }
            else if(keyCode==38&&direction!='bottom')
            {
                direction='top';
            }
            else if(keyCode==40&&direction!='top')
            {
                direction='bottom';
            }
        };
    }

    // 空格键开始
    document.onkeyup=function(ev)
    {
        var oEvent=ev||event;
        if(oEvent.keyCode==32)
        {
            if(gameState===false)
            {
                clearInterval(timer);
                startMove();
                gameState=true;
            }
            else
            {
                clearInterval(timer);
                gameState=false;
            }
        }
    };
};

/**
 * 设置蛇身某一块的坐标
 * @param {[type]} obj [description]
 */
function setPos(obj)
{
    obj.style.left=obj.column*20+'px';
    obj.style.top=obj.row*20+'px';
}

/**
 * 初始化蛇身
 * @return {[type]} [description]
 */
function initSnake() {
  var oSnake=document.getElementById("snake");
  for(var i=0;i<5;i++)
  {
    var snake_body=document.createElement('div');  // 创建蛇的身体
    oSnake.appendChild(snake_body);
    snake_body.row=10;
    snake_body.column=15+i;
    // snakeArray[i]={h:10,l:15+i,div:snake_body};  //蛇身
    snakeArray[i]=snake_body;
    setPos(snakeArray[i]);
  }
}

/**
 * 创建要吃的糖果
 * @return {[type]} [description]
 */
function createCandy()
{
    var oGameView=document.getElementById('game-view');
    while(candy===null)
    {
        var candyRow=parseInt(Math.random()*row);
        var candyColumn=parseInt(Math.random()*column);
        var overlap=true;  //食物不能跟蛇的身体重合
        for(var i=0;i<snakeArray.length;i++)
        {
            if(candyRow==snakeArray[i].row && candyColumn==snakeArray[i].column)
            {
                overlap=false;
            }
        }

        if(overlap)
        {
            candy=document.createElement('div');
            candy.style.position='absolute';
            candy.style.width='20px';
            candy.style.height='20px';
            candy.style.background='#CC3366 ';
            // aEat.push({h:candyRow,l:candyColumn,div:eat_div});
            candy.row=candyRow;
            candy.column=candyColumn;
            setPos(candy);
            oGameView.appendChild(candy);
        }
    }
}