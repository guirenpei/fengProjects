'use strict';
const foo = () => {
  const local = 'local const';
  const bar = () => {
    const local = 'another const';
    const baz = () => {
      console.log('local', local);
    }
    baz();
  }
  bar();
}
foo();
