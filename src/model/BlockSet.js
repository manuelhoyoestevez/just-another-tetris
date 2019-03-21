export default class BlockSet {

	constructor (type, indexI, indexJ, blockArray) {
		this.type = type;
		this.indexI = indexI;
		this.indexJ = indexJ;
		this.blockArray = blockArray;
		this.minI = 0;
		this.maxI = 0;
		this.minJ = 0;
		this.maxJ = 0;

		for(let block of this.blockArray){
			if(block.indexI < this.minI){
				this.minI = block.indexI;
			}

			if(block.indexI > this.maxI){
				this.maxI = block.indexI;
			}

			if(block.indexJ < this.minJ){
				this.minJ = block.indexJ;
			}

			if(block.indexJ > this.maxJ){
				this.maxJ = block.indexJ;
			}
		}

		this.height = 1 + this.maxI - this.minI;
		this.width = 1 + this.maxJ - this.minJ;

		this.blockIndex = [];
		
		for(let i = 0; i < this.height; i++){
            let line = [];
            for(let j = 0; j < this.width; j++){
                line.push(null);
            }

            this.blockIndex.push(line);
		}
		
		for(let block of this.blockArray) {
			this.blockIndex[block.indexI - this.minI][block.indexJ - this.minJ] = block;
		}
	}

	copy() {
		return new BlockSet(this.type, this.indexI, this.indexJ, this.blockArray);
	}

	move(movement) {
		let ret = this.copy();

		movement(ret);

		return ret;
	}

	getBlock(i, j){
		i = i - this.indexI;

		if(i < this.minI){
			return null;
		}

		if(i > this.maxI){
			return null;
		}

		j = j - this.indexJ;

		if(j < this.minJ){
			return null;
		}

		if(j > this.maxJ){
			return null;
		}

		return this.blockIndex[i - this.minI][j - this.minJ]
	}
}
