'use strict';
/**
 * node中使用定时器的问题在于,它并非精确的.譬如setTimeout()设定一个任务在10ms后执行,但是在9ms后,
 * 有一个任务占用了5ms,再次轮到定时器时,已经耽误了4ms.
 */
process.nextTick(() =>  {
  console.log('延迟执行');
});
console.log('正常执行1');
console.log('正常执行2');
console.log('正常执行3');
console.log('正常执行4');
/**
 * setImmediate 与nextTick()有什么区别呢?
 * 发现代码虽然顺序不一样,但是执行的结果是一样的.
  从结果可以发现:
  nextTick()的回调函数执行的优先级要高于setImmediate();
  process.nextTick()属于idle观察者,setImmediate()属于check观察者.在每一轮循环检查中,idle观察者先于I/O观察者,I/O观察者先于check观察者.
  在具体实现上,process.nextTick()的回调函数保存在一个数组中,
  setImmediate()的结果则是保存在链表中.
  在行为上,process.nextTick()在每轮循环中会将数组中的回调函数全部执行完.
  而setImmediate()在每轮循环中执行链表中的一个回调函数.
 */

process.nextTick(() =>  {
  console.log('nextTick延迟');
});
setImmediate(() =>  {
  console.log('setImmediate延迟');
});
console.log('正常执行');

setImmediate(() =>  {
  console.log('setImmediate延迟');
});
process.nextTick(() =>  {
  console.log('nextTick延迟');
});
console.log('正常执行');
// 加入2个nextTick()的回调函数
process.nextTick(() =>  {
  console.log('nextTick延迟执行1');
});
process.nextTick(() =>  {
  console.log('nextTick延迟执行2');
});
// 加入两个setImmediate()回调函数
setImmediate(() =>  {
  console.log('setImmediate延迟执行1');
  process.nextTick(() =>  {
      console.log('强势插入');
    });
});
setImmediate(() =>  {
  console.log('setImmediate延迟执行2');
});
console.log('正常执行');
/**
 * 当第一个setImmediate()的回调函数执行完后,并没有立即执行第二个,
 * 而是进入了下一轮循环,再次按nextTick()优先,setImmediate()次后的顺序执行.
 * 之所以这样设计,是为了保证每次循环能够较快的执行结束.防止CPU占用过多而阻塞后续I/O调用的情况.
 */