a = 124;
start = function(p) {
  console.log('1p = ', p);
   (function(p) {
    console.log('p = ',p);
  })('1234');
};
start(a);
(function(c) {
  console.log('c = ', c);
})('sonta');
//start(p);
