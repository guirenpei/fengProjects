'use strict';


function *fibnocci() {
  let x = 0;
  let y = 1;
  while (true) {
    yield y;
    [x, y] = [y, x + y];
  }
}
const f = fibnocci();
for (let i = 0; i < 10; i++) {
  console.log(f.next());
}
