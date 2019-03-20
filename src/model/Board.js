export default class Board {

    constructor (width, height, blockSet) {
        this.height = height;
        this.width = width;
        this.blockSet = blockSet;
        this.blockIndex = [];

        for(let i = 0; i < height; i++){
            let line = [];
            for(let j = 0; j < width; j++){
                line.push(null);
            }

            this.blockIndex.push(line);
        }
    }

    getBlock(i, j){
        let ret = this.blockSet.getBlock(i, j);
        
        if(ret !== null){
            return ret;
        }

        return this.blockIndex[i][j];
	}

    move(movement){
        let newBlockSet = this.blockSet.move(movement);

        if(this.crash(newBlockSet)) {
            return false;
        }
        else {
            this.blockSet = newBlockSet;
            return true;
        }
    }

    crash(blockSet){

        for(let block of blockSet.blocks) {
            if(blockSet.indexI + block.indexI < 0){
                return true;
            }

            if(blockSet.indexJ + block.indexJ < 0){
                return true;
            }

            if(blockSet.indexI + block.indexI >= this.height){
                return true;
            }

            if(blockSet.indexJ + block.indexJ >= this.width){
                return true;
            }

            if(this.blockIndex[blockSet.indexI + block.indexI][blockSet.indexJ + block.indexJ] !== null){
                return true;
            }
        }


        return false;
    }
}
