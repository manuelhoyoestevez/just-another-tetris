import Block from './Block';
import BlockSet from './BlockSet';
import Tetrominos from './Tetrominos';
import Movements from './Movements';

export default class Board {

    generateBlankLine() {
        let line = [];

        for(let j = 0; j < this.width; j++){
            line.push(null);
        }

        return line;
    }

    /**
     * Número entero aleatorio entre 0 y max - 1
     * @param {number} max
     * @return {number}
     */
    randomInt(max) {
       return parseInt(Math.floor(parseInt(max) * Math.random()));
    }

    constructor (width, height, blockSet = null) {
        this.height = parseInt(height);
        this.width = parseInt(width);
        this.blockIndex = [];
        this.next = 0;
        this.tetrominos = ['I', 'O', 'L', 'J', 'Z', 'S', 'T'];
        this.usedTetrominos = {};
        this.blockSet = blockSet || this.generateNewBlockSet();
        this.blockSetBuffer = [];

        for(let k = 0; k < 3; k++){
            this.blockSetBuffer.push(this.generateNewBlockSet());
        }

        for(let i = 0; i < this.height; i++){
            this.blockIndex.push(this.generateBlankLine());
        }
    }
    
    generateNewBlockSet() {
        let blockArray = [];
        const tetrominoType = this.tetrominos[this.randomInt(this.tetrominos.length)];

        if(!this.usedTetrominos.hasOwnProperty(tetrominoType)){
            this.usedTetrominos[tetrominoType] = 0;
        }

        this.usedTetrominos[tetrominoType]++;

        for(let pair of Tetrominos[tetrominoType]){
            blockArray.push(new Block(pair[0], pair[1], tetrominoType, 0));
        }

        return new BlockSet(tetrominoType, 0, Math.floor(this.width / 2), blockArray);
    }

    getNextBlockSet() {
        this.blockSetBuffer.push(this.generateNewBlockSet());
        return this.blockSetBuffer.shift();
    }

    inBoard(i, j) {
        return i >= 0 && j >= 0 && i < this.height && j < this.width;
    }

    getBlock(i, j) {
        let ret = this.blockSet.getBlock(i, j);
        
        if(ret !== null){
            return ret;
        }

        return this.inBoard(i, j) ? this.blockIndex[i][j] : null;
    }

    lineOn(i) {
        for(let j = 0; j < this.width; j++) {
            if(this.getBlock(i, j) === null) {
                return false;
            }
        }
        return true;
    }
    
    move(movement){
        let movementFunction = Movements[movement];
        let newBlockSet = this.blockSet.move(movementFunction);

        let ret = {
            lastBlockSet: this.blockSet,
            newBlockSet: newBlockSet,
            crash: this.crash(newBlockSet),
            movement: movement,
            gameover: false,
            lines: [],
            changes: []
        };

        if(!ret.crash) {
            let changes = {};

            for(let block of this.blockSet.blockArray){
                const indexI = this.blockSet.indexI + block.indexI;
                const indexJ = this.blockSet.indexJ + block.indexJ;

                if(!changes.hasOwnProperty(indexI)){
                    changes[indexI] = {};
                }

                if(!changes[indexI].hasOwnProperty(indexJ)){
                    changes[indexI][indexJ] = {};
                }
                
                changes[indexI][indexJ]['before'] = block;
            }

            for(let block of newBlockSet.blockArray){
                const indexI = newBlockSet.indexI + block.indexI;
                const indexJ = newBlockSet.indexJ + block.indexJ;

                if(!changes.hasOwnProperty(indexI)){
                    changes[indexI] = {};
                }

                if(!changes[indexI].hasOwnProperty(indexJ)){
                    changes[indexI][indexJ] = {};
                }
                
                changes[indexI][indexJ]['after'] = block;
            }

            for(let i in changes){
                for(let j in changes[i]){
                    if(!changes[i][j].hasOwnProperty('before')){
                        ret.changes.push([i, j, 'fill']);
                    }
                    else if(!changes[i][j].hasOwnProperty('after')){
                        ret.changes.push([i, j, 'clear']);
                    }
                    else if(!changes[i][j]['before'].equals(changes[i][j]['after'])){
                        ret.changes.push([i, j, 'change']);
                    }
                }
            }
            
            this.blockSet = newBlockSet;
        }
        else if(movement === 'down'){
            let heights = [];

            for(let block of this.blockSet.blockArray){
                const indexI = this.blockSet.indexI + block.indexI;
                const indexJ = this.blockSet.indexJ + block.indexJ;

                if(indexI < 0){
                    ret.gameover = true;
                    break;
                }
                else if(heights.indexOf(indexI) < 0){
                    heights.push(indexI);
                }

                this.blockIndex[indexI][indexJ] = block;
            }

            for(let i of heights.sort()){
                if(this.lineOn(i)) {
                    ret.lines.push(i);

                    for(let k = i; k > 0; k--){
                        this.blockIndex[k] = this.blockIndex[k - 1];
                    }
    
                    this.blockIndex[0] = this.generateBlankLine();
                }
            }
            
            this.blockSet = this.getNextBlockSet();

            for(let block of this.blockSet.blockArray){
                const indexI = this.blockSet.indexI + block.indexI;
                const indexJ = this.blockSet.indexJ + block.indexJ;
                ret.changes.push([indexI, indexJ, 'fill']);
            }
        }

        return ret;
    }

    crash(blockSet){

        for(let block of blockSet.blockArray) {

            if(blockSet.indexJ + block.indexJ < 0){
                return true;
            }

            if(blockSet.indexI + block.indexI >= this.height){
                return true;
            }

            if(blockSet.indexJ + block.indexJ >= this.width){
                return true;
            }

            if(blockSet.indexI + block.indexI < 0){
                continue;
            }

            if(this.blockIndex[blockSet.indexI + block.indexI][blockSet.indexJ + block.indexJ] !== null){
                return true;
            }
        }

        return false;
    }

    generateRandomBlock(fixedI = null, fixedJ = null) {
        let randomI = fixedI || this.randomInt(this.height);
        let randomJ = fixedJ || this.randomInt(this.width);

        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){

                let indexI = (randomI + i) % this.height;
                let indexJ = (randomJ + j) % this.width;

                if(this.blockIndex[indexI][indexJ] === null){
                    const block = new Block(indexJ, indexI, this.tetrominos[this.randomInt(this.tetrominos.length)], 0);
                    this.blockIndex[indexI][indexJ] = block;
                    return block;
                }
            }
        }

        return null;
    }

    generateRandomBlocks(height){
        for(let i = 0; i < height; i++){
			for(let j = 0; j < 4; j++){
                this.generateRandomBlock(this.height - 1 - i);
            }
		}
    }
}
