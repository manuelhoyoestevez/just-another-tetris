import Engine from './Engine';

// Update content of greeting element when DOM has been loaded
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const tetrisTag = document.getElementById('tetris');
        const width = tetrisTag.getAttribute('width') || 13;
        const height = tetrisTag.getAttribute('height') || 33;
        
        let engine = new Engine(width, height);
        engine.draw(tetrisTag);
        engine.refresh();

        // Gravedad
        setInterval(() => { engine.move('down'); engine.refresh();  }, 100);
        
        document.getElementById('buttonUp').addEventListener('click', function(event) {
            console.log('Button: UP');
            event.preventDefault();
            engine.move('up');
            engine.refresh();
            return false;
        });

        document.getElementById('buttonDown').addEventListener('click', function(event) {
            console.log('Button: DOWN');
            event.preventDefault();
            engine.move('down');
            engine.refresh();
            return false;
        });

        document.getElementById('buttonRight').addEventListener('click', function(event) {
            console.log('Button: RIGHT');
            event.preventDefault();
            engine.move('right');
            engine.refresh();
            return false;
        });

        document.getElementById('buttonLeft').addEventListener('click', function(event) {
            console.log('Button: LEFT');
            event.preventDefault();
            engine.move('left');
            engine.refresh();
            return false;
        });

        document.getElementById('buttonA').addEventListener('click', function (event) {
            console.log('Button: A');
            event.preventDefault();
            engine.move('turnA');
            engine.refresh();
            return false;
        });

        document.getElementById('buttonB').addEventListener('click', function (event) {
            console.log('Button: B');
            event.preventDefault();
            engine.move('turnB');
            engine.refresh();
            return false;
        });
    })
})();