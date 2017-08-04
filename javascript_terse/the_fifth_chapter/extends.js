'use strict';
/* eslint camelcase: 0 */
// 一个method方法去定义新方法
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};
/**
 * 5.1 伪类
 * 当一个函数对象被创建时，Function构造器产生的函数对象会运行
 * 类似这样的一些代码
 * this.prototype = { constructor: this }
 * 新函数对象被赋予一个prototype属性，其值时一个包含一个constructor属性
 * 且属性值为该型函数对象。该prototype对象是存放继承特征的地方。
 * 因为Javascript语言没有提供一种方法去确定哪个函数是打算用来作构造器的，
 * 所以每个函数都会得到一个prototype对象。constructor属性没什么用，重要的是prototype对象
 * 但伪类有这么几个缺点
 * 1.没有私有环境，所有属性都是公开的
 * 2.无法访问super(父类)的方法
 * 3.如果你在调用构造器时忘记使用new了，危害相当大！所以建议构造器用大写字母开头
 */
// 当采用构造器调用模式，即使用new前缀去调用一个函数时，这将修改函数执行的方式。
// 如果new运算符石一个方法而不是一个运算符，它可能会想这样执行
Function.method('new', function() {
  // 创建一个新对象，它继承自构造器函数的原型对象
  const that = Object.beget(this.prototype);
  // 调用构造器函数，绑定到-this-到新对象上
  const other = this.apply(that, arguments);
  // 如果它的返回值不是一个对象就返回该新对象
  return (typeof other === 'object' && other) || that;
});
// 定义一个构造器并扩充它的原型
const Mammal = function(name) {
  this.name = name;
};
Mammal.prototype.get_name = function() {
  return this.name;
};
Mammal.prototype.says = function() {
  return this.saying || '';
};
// 现在，可以构造一个实例
const myMammal = new Mammal('Herb the Mammal');
const name = myMammal.get_name();
console.log('name', name);
// 我们可以构造另一个味蕾来继承Mammal，这是通过定义它的constructor函数
// 并替换它的prototype为一个Mammal的实例来实现的
const Cat = function(name) {
  this.name = name;
  this.saying = 'meow';
};
// 替换Cat.prototype为一个新的Mammal实例
Cat.prototype = new Mammal();
// 扩充新原型对象，增加purr和get_name方法
Cat.prototype.purr = function(n) {
  let i;
  let s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += 'r';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function() {
  return `${this.says()} ${this.name} ${this.says()}`;
};
const myCat = new Cat('Henrietta');
const says = myCat.says();
console.log('says', says);
const purr = myCat.purr('5');
console.log('purr', purr);
const name1 = myCat.get_name();
console.log('name1', name1);
// 伪类模式本意是想向面向对象靠拢，但它看起来格格不入。
// 我们可以隐藏一些丑陋的细节。
// 这是通过使用method方法定义一个inherits方法来实现的
Function.method('inherits', function(Parent) {
  this.prototype = new Parent();
  return this;
});
// 这样inherits和method方法都返回this，这将允许我们可以以
// 级联的样式变成。现在用遗憾语句构造我们的Mouse
let Mouse = function(name) {
  this.name = name;
  this.saying = 'meow';
}.inherits(Mammal)
.method('purr', (n) => {
  let i;
  let s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += 'r';
    }
    s += 'r';
  }
  return s;
}).method('get_name', function() {
  return `${this.says()} ${this.name} ${this.says()}`;
});
/**
 * 重新理解JS的6中继承方式
 * @author 黯羽轻扬ayqy.net  摘自http://www.cnblogs.com/ayqy/p/4471638.html
 */
/**
 * 约定
 */
function Fun() {
  // 私有属性
  let val = 1; // 私有基本属性
  let arr = [1]; // 私有引用属性
  function fun() {} // 私有函数（引用属性）
  // 实例属性
  this.val = 1; // 实例基本属性
  this.arr = [1]; // 实例引用属性
  this.fun = function() {}; // 实例函数（引用属性
}
// 原型属性
Function.prototype.val = 1; // 原型基本属性
Function.prototype.arr = [1]; // 原型引用属性
Function.prototype.fun = function() {}; // 原型函数（引用属性）
/**
 * 一、简单原型链
 * 这是实现继承最简单的方式了
 */
// 1.具体实现
function Super() {
  this.val = 1;
  this.arr = [1];
}
function Sub() {

}
Sub.prototype = new Super(); // 核心
const sub1 = new Sub();
const sub2 = new Sub();
sub1.val = 2;
sub1.arr.push(2);
console.log(sub1.val); // 2
console.log(sub2.val); // 1
console.log(sub1.arr); // [1, 2]
console.log(sub2.arr); // [1, 2]
// 2.核心 拿父类实例来充当子类原型对象
/**
 * 3.优缺点
 * 优点
 * 1.简单，易于实现
 * 缺点
 * 1.修改sub1.arr后sub2.arr也变了，因为来自原型对象的引用属性是所有实例共享的。
 * 可以这样理解：执行sub1.arr.push(2);
 * 先对sub1进行属性查找，找遍了实例属性（在本例中没有实例属性），
 * 没找到，就开始顺着原型链向上找，拿到了sub1的原型对象，
 * 一搜身，发现有arr属性。于是给arr末尾插入了2，
 * 所以sub2.arr也变了
 * 2.创建子类实例时，无法向父类构造函数传参数
 */
/**
 * 二、借用构造函数
 */
// 1.具体实现
function Super2(val) {
  this.val = val;
  this.arr = [1];
  this.fun = function() {};
}
function Sub2(val) {
  Super2.call(this, val); // 核心
}
let sub3 = new Sub2(1);
let sub4 = new Sub2(2);
sub3.arr.push(2);
console.log('sub3.val', sub3.val);
console.log('sub4.val', sub4.val);
console.log('sub3.arr', sub3.arr);
console.log('sub4.arr', sub4.arr);
console.log('sub3.fun === sub4.fun', sub3.fun === sub4.fun);
/**
 * 2.核心
 * 借用父类的构造函数来增强子类实例，等于是把父类实例属性复制了一份给之类实例装上了（完全没有用到原型）
 * 3.优缺点
 * 优点：
 * 1.解决了子类实例共享父类引用属性的问题
 * 2.创建子类实例时，可以向父类构造函数传参数
 * 缺点：
 * 1.无法实现函数服用，每个子类实例都持有一个型的fun函数，太多了就会影响性能，
 * 内存爆炸
 */
/**
 * 三、组合继承（最常用）
 * 在无法实现函数复用的情况下，又有了这么一套方案
 */
// 1.具体实现
function Super3() {
  // 只在此处声明基本属性和引用属性
  this.val = 1;
  this.arr = [1];
}
// 在此处声明函数
Super.prototype.fun1 = function() {};
Super.prototype.fun2 = function() {};
function Sub3() {
  Super3.call(this); // 核心
}
Sub.prototype = new Super(); // 核心
let sub5 = new Sub3(1);
let sub6 = new Sub3(2);
console.log('sub5.fun === sub6.fun', sub5.fun === sub6.fun);
/**
 * 2.核心
 * 把实例函数都放在原型对象上，以实现原型复用。同时还要保留借用构造函数方式的优点。
 * 通过Super3.call(this);继承负累的基本属性和引用属性并保留能传参的优点；通过
 * Sub3.prototype = new Super();继承父类函数，实现函数复用
 * 3.优缺点
 * 优点：
 * 1.不存在引用属性共享问题
 * 2.可传参
 * 3.函数可复用
 * 缺点：
 * 1.一点小瑕疵，在子类原型上有一份多余的父类实例属性，因为父类构造函数
 * 被调用了两次，生成了两份，二之类实例上的那一份是屏蔽了子类原型上的。这是属于内存浪费
 */

/**
 * 四、寄生组合继承（最佳方式）
 */
// 1.具体实现
function beget(obj) { // 生孩子函数 beget：龙beget龙，凤beget凤
  let F = function() {};
  F.prototype = obj;
  return new F();
}
function Super4() {
  // 只在此处声明基本属性和引用属性
  this.val = 1;
  this.arr = [1];
}
// 在此处声明函数
Super4.prototype.fun1 = function() {};
Super4.prototype.fun2 = function() {};

function Sub4() {
  Super4.call(this); // 核心
}
let proto = beget(Super4.prototype); // 核心
proto.constructor = Sub4; // 核心
Sub.prototype = proto; // 核心
let sub7 = new Sub4();
console.log('sub7.val', sub7.val);
console.log('sub7.arr', sub7.arr);
/**
 * 2.核心
 * 用beget(Super4.prototype)；切掉了原型对象上多余的那份父类实例属性
 * 3.优缺点
 * 优点：
 * 完美了
 * 缺点：
 * 出了用起来有些麻烦，没有性能上的缺点
 */

/**
 * 五、原型式
 */
// 1.具体实现
function Super5() {
  this.val = 1;
  this.arr = [1];
}
// 拿到父类对象
let sup8 = new Super5();
// 生孩子
let sub9 = beget(sup8); // 核心
// 增强
sub9.attr1 = 1;
sub9.attr2 = 2;

console.log('sub9.val', sub9.val);
console.log('sub9.arr', sub9.arr);
console.log('sub9.attr1', sub9.attr1);
/**
 * 2.核心
 * 用beget函数得到一个“纯洁”的新对象，也就是没有实例属性
 * 再逐步增强（填充实例属性）
 * 3.优缺点
 * 优点
 * 1.从已有对象衍生对象，不需要创建自定义类型（更像是对象复制，而不是继承）
 * 缺点
 * 1.原型引用属性会被所有实例共享，因为是用整个父类对象来充当了子类原型对象，
 * 所以这个缺陷无可避免
 * 2.无法实现代码复用（新对象时现取的属性数现添的，没有用函数封装过，也就无法复用了）
 */

/**
 * 6、寄生式
 * 寄生式式一种模式，并不是只能实现继承
 */

// 1.具体实现
function super6() {
  this.val = 1;
  this.arr = [1];
}
function getSubObject(obj) {
  // 创建新对象
  let clone = beget(obj); // 核心
  // 增强
  clone.attr1 = 1;
  clone.attr2 = 2;
  return clone;
}
let sub10 = getSubObject(new Super());
console.log('sub10.val', sub10.val);
console.log('sub10.arr', sub10.arr);
console.log('sub10.attr1', sub10.attr1);
/**
 * 2.核心
 * 给原型式继承穿了一个马甲而已，看起来更像继承了
 * 注意：beget函数并不是必须的，换言之，创建新对象 -> 增强 -> 返回该对象，
 * 这样的过程叫寄生式继承，新对象是如何创建的并不重要
 * 3.优缺点
 * 优点：
 * 1.还是不需要创建自定义类型
 * 缺点
 * 1.无法实现函数复用（没有用到原型，当然不行）
 */

