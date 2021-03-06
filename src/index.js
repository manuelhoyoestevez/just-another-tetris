import Engine from './Engine';

require('babel-polyfill');

function getMovement(keyCode){
  switch(keyCode){
    case 37:
       return 'left';

    case 39:
       return 'right';

    case 40:
       return 'down';
     
     case 13: // Enter
       return 'pause';
     case 16: // Shift
     case 17: // Cntl
     case 18: // AltGr
     case 18: // Spacebar
       return 'turnA';

     case 101: // Keypad 5
       return 'turnB';

     default:
       return null;
  }
}

(function(){
  document.addEventListener('DOMContentLoaded', function() {
    const tetrisTag = document.getElementById('tetris');
    const width = tetrisTag.getAttribute('width') || 13;
    const height = tetrisTag.getAttribute('height') || 33;

    const previewTag = document.getElementById('preview');
    
    let engine = new Engine();
    engine.init(width, height, tetrisTag, previewTag);

    engine.start();

    document.onkeydown = function checkKey(event) {
      event = event || window.event;
      const movementCode = getMovement(event.keyCode);
      
      switch(movementCode){
        case 'pause':
          engine.pauseOrResume();
          break;
        default:
          if(movementCode !== null){
            engine.move(movementCode);
          }
      }

      return false;
    };
  })
})();