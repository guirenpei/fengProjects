'use strict';

console.log({
  rss: process.memoryUsage().rss, // 常驻内存大小，是指在RAM中维持的进程内存的那一部分
  heapTotal: process.memoryUsage().heapTotal, // 动态分配的可用内存
  heapUsed: process.memoryUsage().heapUsed, // 已经使用的堆大小
});