'use strict';
/* eslint no-console:0 */

const _ = require('underscore');

// 正常写法
// let lyrics = [];
// for (let bottles = 99; bottles > 0; bottles -= 1) {
//   lyrics.push(`${bottles} bottles of beer on the wall`);
//   lyrics.push(`${bottles} bottles of beer`);
//   lyrics.push('Take One down, pass it around');
//   if (bottles > 1) {
//     lyrics.push(`${bottles - 1} bottles of beer on the wall`);
//   } else {
//     lyrics.push('No more bottles of beer on the wall');
//   }
// }
// console.log(lyrics);
const lyricSegment = (n) => {
  return _.chain([])
    .push(`${n} bottles of beer on the wall`)
    .push(`${n} bottles of beer`)
    .push('Take One down, pass it around')
    .tap(console.log((lyrics) => {
      if (n > 1) {
        lyrics.push(`${n - 1} bottles of beer on the wall`);
      }
      lyrics.push('No more bottles of beer on the wall');
    }))
    .value();
};
lyricSegment(9);
