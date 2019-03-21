import Block from './Block';
import BlockSet from './BlockSet';
import Tetrominos from './Tetrominos';
import Movements from './Movements';

export default class Board {

    constructor (width, height) {
        this.height = height;
        this.width = width;
        this.blockIndex = [];
        this.tetrominos = ['J', 'L', 'I'];

        this.blockSet = this.generateNewBlockSet();

        this.blockSetBuffer = [];

        for(let i = 0; i < 3; i++){
            this.blockSetBuffer.push(this.generateNewBlockSet());
        }

        for(let i = 0; i < height; i++){
            let line = [];
            for(let j = 0; j < width; j++){
                line.push(null);
            }

            this.blockIndex.push(line);
        }
    }
    
    generateNewBlockSet(){
        let blockArray = [];
        const index = Math.round((this.tetrominos.length - 1) * Math.random());
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

    getBlock(i, j){
        let ret = this.blockSet.getBlock(i, j);
        
        if(ret !== null){
            return ret;
        }

        return this.blockIndex[i][j];
    }
    
    move(movement){
        let movementFunction = Movements[movement];
        let newBlockSet = this.blockSet.move(movementFunction);

        let ret = {
            lastBlockSet: this.blockSet,
            newBlockSet: newBlockSet,
            crash: this.crash(newBlockSet),
            movement: movement,
            gameOver: false
        };

        if(movement === 'down' && ret.crash){
            for(let block of this.blockSet.blockArray){
                if(this.blockSet.indexI + block.indexI < 0){
                    ret.gameOver = true;
                    break;
                }

                this.blockIndex[this.blockSet.indexI + block.indexI][this.blockSet.indexJ + block.indexJ] = block;
            }

            // Transferir todos los blocks al board
            this.blockSet = this.getNextBlockSet();
        }
        else if(!ret.crash) {
            this.blockSet = newBlockSet;
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
