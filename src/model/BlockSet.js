export default class BlockSet {

	constructor (type, indexI, indexJ, blockArray) {
		this.type = type;
		this.blockArray = blockArray;
		
		// Posición relatica al Board
		this.indexI = indexI;
		this.indexJ = indexJ;
	}

	copy() {
		let blockArrayCopy = [];

		for(let block of this.blockArray){
			blockArrayCopy.push(block.copy());
		}

		return new BlockSet(this.type, this.indexI, this.indexJ, blockArrayCopy);
	}

	move(movement) {
		let ret = this.copy();

		movement(ret);

		return ret;
	}

	getBlock(i, j) {
		for(const block of this.blockArray) {
			if(block.indexI === i - this.indexI && block.indexJ === j - this.indexJ){
				return block;
			}
		}
		return null;
	}
}
