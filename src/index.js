import Engine from './Engine';


//update content of greeting element when DOM has been loaded
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        const tetrisTag = document.getElementById('tetris');
        const width = tetrisTag.getAttribute('width') || 13;
        const height = tetrisTag.getAttribute('height') || 33;
        
        let engine = new Engine(width, height);
        engine.draw(tetrisTag);
        engine.refresh();

        const leftButton = document.getElementById('buttonLeft');
        const rightButton = document.getElementById('buttonRight');

        leftButton.addEventListener('click', function(event) {
            engine.moveLeft();
            engine.refresh();
        });

        rightButton.addEventListener('click', function (event) {
            engine.moveRight();
            engine.refresh();
        });
    })
})();