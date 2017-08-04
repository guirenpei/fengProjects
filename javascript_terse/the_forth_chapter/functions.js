'use strict';
/* eslint camelcase: 0 */
/* eslint prefer-rest-params: 0 */
// 调用
// 传递控制权和参数给函数，出了声明时定义的形式参数，每个函数都接受两个附加的参数
// this和arguments 参数this在面向对象编程中非常重要，它取决于函数调用的方式
// 在javascript中一共有四种调用函数的方式
// 方法调用模式，函数调用模式，构造器调用模式和apply调用模式

/**
  * 方法调用模式
  * 方法可以使用this访问对象，所以它能从对象中取值或修改该对象
  * this到对象的绑定发生在调用的时候
  * 这个“超级”迟绑定（very late binding）使得函数可以对this高度复用
  * 通过this去的它们所属对象的上下文的方法成为公共方法
  */
const myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};
myObject.increment();
console.log('myObject--increment', myObject.value);
myObject.increment(2);
console.log('myObject--increment-2', myObject.value);
/**
  * 函数调用模式
  * 当一个函数并非对象的属性时，那么它会被当作一个函数来使用
  * 当函数以此模式被调用时，this被绑定到全局对象
  * 有一个解决的方法
  */
function add(a, b) {
  return a + b;
}
myObject.double = function() {
  const that = this;
  const helper = function() {
    that.value = add(that.value, that.value);
  };
  helper(); // 以函数的形式调用helper
};
// 以方法的形式调用double
myObject.double();
console.log('myOBject-double', myObject.value);
/**
  * 构造器调用模式
  * 如果在一个函数前面带上一个new来调用，那么将创建一个隐藏的连接到该函数prototype成员的新对象
  * 同时this也被绑定到该对象上
  * new前缀也会改变return语句的行为
  * 按照约定，它们保存在以大写格式命名的变量里。
  * 如果调用构造器函数是没有加上new，可能会发生糟糕的事情，既没有编译时警告，也没有运行时警告
  * 所以大写约定非常重要
  */
const Quo = function(string) {
  this.status = string;
};
// 给Quo的所有实例提供一个get_status的公共方法
Quo.prototype.get_status = function() {
  return this.status;
};
// 构造一个Quo实例
const myQuo = new Quo('confused');
console.log('令人困惑的Quo实例', myQuo.get_status());
/**
  * apply调用模式
  * apply方法让我们构建一个参数数组并用其去调用函数，它也允许我们选择this的值
  * apply方法接收两个参数
  * 第一个是被绑定给this值
  * 第二个就是一个参数数组
  */
// 构造一个包含两个数字的数组，并让它们两个相加
const array = [3, 4];
// const sum = add.apply(null, array);
const sum = add(...array); // es6中可以使用spread方法
console.log('sum-apppy', sum);
// 构造一个包含status成员的对象
const statusObject = {
  status: 'A-OK'
};
// statusObject对象并没有继承自Quo.prototype,但我们可以为statusObject上调用
// get_status方法，尽管statusObject并没有一个名为get_status的方法

const status = Quo.prototype.get_status.apply(statusObject);
console.log('apply', status);
/**
  * 参数
  * 当函数被调用时，会得到一个“免费”奉送的参数，那就是arguments数组。
  * 通过它函数可以访问所有它调用时传递给它的参数，包括那些没有被分配给函数声明时定义的形式参数的多余参数
  * 这使得编写一个无需指定参数个数的函数成为可能
  */
// 构造一个将很多值相加的函数
// 注意函该函数内部定义的比阿亮sum不会与函数外部定义的sum产生冲突
// 该函数只会看到内部的那个变量
const sum2 = function() {
  let i;
  let sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};
console.log(sum2(4, 8, 15, 25, 90));
/**
  * 返回
  * 当一个函数被调用时，它会从第一个语句开始执行，并在遇到关闭函数体}时结束
  * 那使得函数把控制权交换给调用该函数的程序部分
  * return语句可用来使该函数提前返回，当return被执行时，函数立即返回而不再执行余下的语句
  * 一个函数总会返回一个值，如果没有指定返回值，那么将会返回undefined
  * 如果函数已在前面加上new前缀的方式来调用，且返回值不是一个对象，这返回this（该新对象）
  */
/**
  * 异常
  * JavaScript提供了一套异常处理机制。异常是干扰程序的正常流程的非正常（但并非完全是出乎意料）的事故
  * 当查出这样的事故时，你的程序应该抛出一个异常
  */
const add2 = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
};
/**
  * throw语句中断函数的运行。它应该抛出一个exception对象，该对象包含可识别异常类型的name属性和一个描述性的message属性
  * 当然你也可以添加其他的属性
  * 该exception对象将被传递到一个try语句的catch从句
  */
const try_it = function() {
  try {
    add2('seven');
  } catch (e) {
    console.log(`${e.name}:${e.message}`);
  }
};
try_it();
/**
  * 给类型增加方法
  * JavaScript允许给语言的基本类型增加方法
  * 我们可以通过Function.prototype增加方法来使得该方法对所有函数可用
  */
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};
Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});
console.log('-3', (-10 / 3).integer());
String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});
let anme = '    neat';
console.log(anme.trim());
/**
  * 给类型增加方法
  * 基本类型的原型是公共的结构，所以在类库混用时务必小心，
  * 一个保险的做法就是只在确定没有该方法的时候才添加它
  */
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};
/**
  * 递归
  * 递归函数会直接或间接地调用自身的一种函数。递归是一种强大的编程技术，
  * 它将一个问题分解为一组相似的子问题，每一个都用一个寻常解去解决
  * 一般来说，一个递归函数调用自身去解决它的之问题
  */
/**
  * 汉诺塔是一个著名的难题。塔的设备包括三根柱子和一套直径各不相同的空心圆盘
  * 开始时源柱子上的所有圆盘都按照较小的圆盘放在较大的圆盘上的顺序堆叠
  * 目标是通过每次移动一个圆盘到另一个柱子，最终将一堆圆盘移动到目标柱子上。
  * 过程中不可以将大的圆盘放置在较小的圆盘之上，这个难题有一个寻常解
  */
const hanoi = function(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux);
    console.log(`Move dist ${disc} from ${src} to ${dst}`);
    hanoi(disc - 1, aux, src, dst);
  }
};
hanoi(3, 'Src', 'Aux', 'Dst');
/**
 * 记忆
 * 函数可以用对象去记忆先前操作的结果，从而能避免无谓的运算。
 * 这种优化被称为记忆(memoization)。javascript的对象和数组要实现这种优化是非常方便的。
 * 比如说，我们想要一个地柜函数来计算Fibonacci数列。一个Fibonacci数字是之前两个Fibonacci数字之和。
 * 最前面的两个数字是0和1
 */
// test1
let fibonacci1 = (n) => n < 2 ? n : fibonacci1(n - 1) + fibonacci1(n - 2);
for (let i = 0; i <= 10; i += 1) {
  console.log(`// ${i}: ${fibonacci1(i)}`);
}
/**
 * 摘自 javascript语言精粹 4.15 记忆
 * 上面的例子是可以正常运行，但是做了很多无谓的工作。
 * 首先fibonacci函数被调用了453次。
 * 我们调用了11次，而它自身调用了442次去计算可能已被刚计算过的值。
 * 如果我们让该函数具备记忆功能，那么就可以显著地减少它的运算量
 * 我们在一个名为memo的数组里保存我们的存储结果，存储结果可以隐藏在闭包中。
 * 但我们的函数被调用时，这个函数首先看是否已经知道储存结果，
 * 如果已经知道，就立即返回这个存储结果
 */
const fibonacci = function() {
  let memo = [0, 1];
  let fib = (n) => {
    let result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}();
console.log(fibonacci(111));
/**
 * memoizer函数将取得一个初始的memo数组和fundamental函数。
 * 它返回一个管理memo存储和在需要时调用fundamental函数的shell函数。
 * 我们传递这个shell函数和该函数的参数给fundamental函数
 */
const memoizer = (memo, fundamental) => {
  const shell = (n) => {
    let result = memo[n];
    if (typeof result !== 'number') {
      result = fundamental(shell, n);
      memo[n] = result;
    }
    return result;
  };
  return shell;
};
// 现在使用memoizer来定义fibonacci函数，提供其初始的memo数组和fundamental函数
const fibonacci2 = memoizer([0, 1], (shell, n) => shell(n - 1) + shell(n - 2));
console.log('fibonacci2', fibonacci2(5));
/**
 * 通过设计能产生出其他函数的函数，可以极大减少我们必须要做的工作。
 * 例如：要产生一个可记忆的阶乘函数
 * 我们只需提供基本的阶乘公式即可
 */
const factorial = memoizer([1, 1], (shell, n) => n * shell(n - 1));
console.log('factorial', factorial(10));