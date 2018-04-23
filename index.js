 
 var odiv = document.getElementById('app');
 //bind的原理：把传递进来的callback这个方法中的this预先处理为context
 function bind(callBack,context){
    var outerArg = Array.prototype.slice.call(arguments,2);
    context = context || window;
    return function(){
        //这是鼠标事件对象 是点击的时候 浏览器传进的
        var innerArg = Array.prototype.slice.call(arguments,0);
        callBack.apply(context,outerArg.concat(innerArg));
    }
}
//在Function 的原型上实现一个mybind的方法
Function.prototype.myBind=function myBind(context){
    //这里的this 就是fn
    var _this = this;
    var outerArg=Array.prototype.slice.call(arguments,1);
    //兼容
    if('bind' in Function.prototype){
        return this.bind.apply(this,context.concat(outerArg));
    }
    //不兼容
    return function(){
        var innerArg = Array.prototype.slice.call(arguments,0);
        innerArg.length===0 ? innerArg[innerArg.length]=window.event : null;
        var arg = outerArg.concat(innerArg);
        _this.apply(context,arg);
    }
}
var obj ={
    name:'哈哈'
}
function fn(num1,num2){
    console.log(this,num1,num2,arguments[2]);
}
odiv.onclick = fn.myBind(obj,100,200)






//odiv.onclick=bind(fn,obj,100,200);//fn中的this是div num1 是 鼠标事件对象 num2 是 undefined
// odiv.onclick=function(){
//     //个元素的某个行为绑定方法，当行为触发的时候，执行对应的方法，此时方法中的
//     //this是当前元素本身，而且浏览器还会给当前的方法默认的传递一个参数 MouseEvent(鼠标事件对象);
//      在IE6-8下没有传递这个值 在window.event中存储的
//     console.log(e);
// };
// document.body.onclick=function(){
//     alert(1);
// }
//给定时器绑定一个方法，当定时器达到时间的时候
//让fn执行，并且让fn中的this变成obj
setTimeout(bind(fn,obj,100,200),0);