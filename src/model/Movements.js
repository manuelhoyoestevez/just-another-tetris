export default {
    'up': blockSet => {
        blockSet.indexI--;
    },
    'down': blockSet => {
        blockSet.indexI++;
    },
    'left': blockSet => {
        blockSet.indexJ--;
    },
    'right': blockSet => {
        blockSet.indexJ++;
    },
    'turnA': blockSet => {
        for(let index of Object.keys(blockSet.blockArray)) {
            const block  = blockSet.blockArray[index];
            const indexI = block.indexI + 0.5;
            const indexJ = block.indexJ + 0.5;
            block.indexI = -indexJ - 0.5;
            block.indexJ = +indexI - 0.5;
        }
    },
    'turnB': blockSet => {
        for(let index of Object.keys(blockSet.blockArray)) {
            const block  = blockSet.blockArray[index];
            const indexI = block.indexI + 0.5;
            const indexJ = block.indexJ + 0.5;
            block.indexI = +indexJ - 0.5;
            block.indexJ = -indexI - 0.5;
        }
    }
};