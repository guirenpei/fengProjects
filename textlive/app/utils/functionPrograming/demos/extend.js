'use strict';
const extend = (subClass, baseClass) => {
  // 暂存父类构造器
  subClass.baseConstructor = baseClass;
  subClass.base = {};
  // 复制父类特性（属性与方法）
  baseClass.call(subClass.base);
};

/**
 * 构建对象系统
*/
function Mouse() {}
function Animal(name) {
  this.name = name;
  this.say = (message) => {
    console.log(this.name + ': ' + message);
  }
  this.eat = () => this.say('Yum!');
}
function Cat() {
  Cat.baseConstructor.call(this, 'cat');
  this.eat = (food) => {
    if (food instanceof Mouse) {
      Cat.base.eat.call(this);
    } else {
      this.say('Yuk, I only eat mice, not eat ' + food.name)
    }
  }
}
extend(Cat, Animal);

function Lion() {
  Lion.baseConstructor.call(this, 'lion');
}
extend(Lion, Cat);

const cat = new Cat();
const lion = new Lion();
const mouse = new Mouse();
const unKnowObj = {};
cat.eat(mouse);
cat.eat(unKnowObj);
lion.eat(mouse);
