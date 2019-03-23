export default {
    'up': blockSet => {
        console.log('Function: UP');
        blockSet.indexI--;
    },
    'down': blockSet => {
        console.log('Function: DOWN');
        blockSet.indexI++;
    },
    'left': blockSet => {
        console.log('Function: LEFT');
        blockSet.indexJ--;
    },
    'right': blockSet => {
        console.log('Function: RIGHT');
        blockSet.indexJ++;
    },
    'turnA': blockSet => {
        console.log('Function: A');
        for(let index of Object.keys(blockSet.blockArray)) {
            let block = blockSet.blockArray[index];
            let indexI = block.indexI + 0.5;
            let indexJ = block.indexJ + 0.5;
            block.indexI = -indexJ - 0.5;
            block.indexJ = +indexI - 0.5;
        }
    },
    'turnB': blockSet => {
        console.log('Function: B');
        for(let index of Object.keys(blockSet.blockArray)) {
            let block = blockSet.blockArray[index];
            let indexI = block.indexI + 0.5;
            let indexJ = block.indexJ + 0.5;
            block.indexI = +indexJ - 0.5;
            block.indexJ = -indexI - 0.5;
        }
    }
};