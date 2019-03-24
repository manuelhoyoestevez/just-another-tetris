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

    constructor (width, height) {
        this.height = height;
        this.width = width;
        this.blockIndex = [];
        this.next = 0;

        this.tetrominos = ['I', 'O', 'L', 'J', 'Z', 'S', 'T',];

        this.blockSet = this.generateNewBlockSet();

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
        this.next = (this.next + 1) % this.tetrominos.length;
        const index = this.next; // Math.round((this.tetrominos.length - 1) * Math.random());
        const tetrominoType = this.tetrominos[index];

        for(let pair of Tetrominos[tetrominoType]){
            blockArray.push(new Block(pair[0], pair[1], tetrominoType, 0));
        }

        return new BlockSet(tetrominoType, 0, Math.floor(this.width / 2), blockArray);
    }

    getNextBlockSet() {
        this.blockSetBuffer.push(this.generateNewBlockSet());
        return this.blockSetBuffer.shift();
    }

    getBlock(i, j) {
        let ret = this.blockSet.getBlock(i, j);
        
        if(ret !== null){
            return ret;
        }

        return this.blockIndex[i][j];
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
            lines: []
        };

        if(!ret.crash) {
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
}
