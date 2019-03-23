import Engine from './Engine';

function getMovement(keyCode){
    switch(keyCode){
        case 37:
           return 'left';

        case 38:
           return 'up';

        case 39:
           return 'right';

        case 40:
           return 'down';
       
       case 13: // Enter
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

// Update content of greeting element when DOM has been loaded
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const tetrisTag = document.getElementById('tetris');
        const width = tetrisTag.getAttribute('width') || 13;
        const height = tetrisTag.getAttribute('height') || 33;
        
        let engine = new Engine(width, height);
        engine.draw(tetrisTag);

        engine.start();

        document.onkeydown = function checkKey(event) {
            event = event || window.event;
console.log('event', event);
            const movementCode = getMovement(event.keyCode);
console.log('movementCode', movementCode);
            if(movementCode !== null){
                engine.move(movementCode);
            }

            return false;
        };
    })
})();