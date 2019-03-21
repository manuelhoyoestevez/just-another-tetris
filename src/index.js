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

        const upButton = document.getElementById('buttonUp');
        const downButton = document.getElementById('buttonDown');
        const leftButton = document.getElementById('buttonLeft');
        const rightButton = document.getElementById('buttonRight');

        const aButton = document.getElementById('buttonA');
        const bButton = document.getElementById('buttonB');
        
        upButton.addEventListener('click', function(event) {
            console.log('Button: UP');
            event.preventDefault();
            engine.move('up');
            engine.refresh();
            return false;
        });

        downButton.addEventListener('click', function(event) {
            console.log('Button: DOWN');
            event.preventDefault();
            engine.move('down');
            engine.refresh();
            return false;
        });

        leftButton.addEventListener('click', function(event) {
            console.log('Button: LEFT');
            event.preventDefault();
            engine.move('left');
            engine.refresh();
            return false;
        });

        aButton.addEventListener('click', function (event) {
            console.log('Button: A');
            event.preventDefault();
            engine.move('turnA');
            engine.refresh();
            return false;
        });

        bButton.addEventListener('click', function (event) {
            console.log('Button: B');
            event.preventDefault();
            engine.move('turnB');
            engine.refresh();
            return false;
        });
    })
})();