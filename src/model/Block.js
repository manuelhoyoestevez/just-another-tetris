export default class Block {

	/**
	 * Constructor
	 * @param {number} indexJ 
	 * @param {number} indexI 
	 * @param {string} type 
	 * @param {number} status 
	 */
	constructor (indexJ, indexI, type, status) {
		this.type = type;
		this.status = status;

		// Posición relativa al BlockSet
		this.indexI = indexI;
		this.indexJ = indexJ;
	}
	
	/**
	 * Copia el Block
	 * @return {Block}
	 */
	copy() {
		return new Block(this.indexJ, this.indexI, this.type, this.status);
	}

	/**
	 * Compara el Block con otro Block
	 * @param {Block} block 
	 * @return {boolean}
	 */
	equals (block) {
		return this.type === block.type && this.status === block.status;
	}
}
