'use strict';

const log = require('rainbowlog');
const func = require('../lib/funcs');
function enumeration(namesToValues) {
  const enumeration = function() { throw 'cant\'t Instance enumerations'; };

  // 枚举值继承自这个对象
  const proto = enumeration.prototype = {
    constructor: enumeration,
    toString: () => this.name,
    valueOf: function() { return this.value; },
    toJSON: () => this.name,
  };
  enumeration.values = []; // 用以存放枚举对象的数组
  // 现在创建新类型的实例
  for (let name in namesToValues) {
    if (namesToValues.hasOwnProperty(name)) {
      const e = func.clone(proto);
      e.name = name;
      e.value = namesToValues[name];
      enumeration[name] = e;
      enumeration.values.push(e);
    }
  }
  // 一个类方法，用来对类的实例进行迭代
  enumeration.foreach = function(f, c) {
    for (let i = 0; i < this.values.length; i++) {
      f.call(c, this.values[i]);
    }
  };

  return enumeration;
}
function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;
}
// 使用枚举类型定义花色和点数

Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});
Card.Rank = enumeration({
  Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
  Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14
});

// 定义用以描述牌面的花色和文本
Card.prototype.toString = () => `${this.rank.toString()} of ${this.suit.toString()}`;

// 比较两张扑克牌的大小
Card.prototype.compareTo = (that) => {
  if (this.rank < that.rank) { return -1; }
  if (this.rank > that.rank) { return 1; }
  return 0;
};

// 以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = (a, b) => a.compareTo(b);

// 以桥牌的玩法规则对扑克牌进行排序
Card.orderBySuit = (a, b) => {
  if (a.suit < b.suit) { return -1; }
  if (a.suit > b.suit) { return 1; }
  if (a.rank < b.rank) { return -1; }
  if (a.rank > b.rank) { return 1; }
  return 0;
};

// 定义用以表示一副标准扑克牌的类

function Deck() {
  let cards = this.cards = [];
  Card.Suit.foreach((s) => {
    Card.Rank.foreach((r) => {
      cards.push(new Card(r, s));
    });
  });
}

// 洗牌的方法：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
  // 遍历数组中的每个元素，随机找出最小的元素，并与之（当前遍历的元素）交换
  let deck = this.cards;
  let len = deck.length;
  for (let i = len - 1; i > 0; i--) {
    let temp;
    const r = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[r];
    deck[r] = temp;
  }
  return this;
};

// 发牌的方法：返回牌的数组

Deck.prototype.deal = function(n) {
  if (this.cards.length < n) { throw 'Out of Card'; }
  return this.cards.splice(this.cards.length - n, n);
};

// 创建一副新扑克牌，洗牌并发牌

const deck = (new Deck()).shuffle();
const hand = deck.deal(13).sort(Card.orderBySuit);

// console.log();









log.trace('end');
