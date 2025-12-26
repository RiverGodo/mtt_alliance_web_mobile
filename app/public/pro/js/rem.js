// (function (doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function () {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       docEl.style.fontSize = clientWidth / 10 + 'px';
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);


function resize(){
  var docEl = document.documentElement;
  var clientWidth = window.innerWidth;
  if(!clientWidth) return;
  if (clientWidth >= 750) {
    docEl.style.fontSize = "100px"
  }else{
    docEl.style.fontSize = clientWidth / 10 + 'px';
  }
}

resize()