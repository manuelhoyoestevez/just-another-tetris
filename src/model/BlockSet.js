import Block from './Block';

export default class BlockSet {

	/**
	 * Constructor
	 * @param {string}  type   Tipo de tetramino
	 * @param {number}  indexI Índice vertical con respecto al Board
	 * @param {number}  indexJ Índice horizontal con respecto al Board
	 * @param {Block[]} blockArray Blocks que componen el BlockSet 
	 */
	constructor (type, indexI, indexJ, blockArray) {
		this.type = type;
		this.blockArray = blockArray;
		this.indexI = indexI;
		this.indexJ = indexJ;
	}

	/**
	 * Crea el BlockSet
	 * @returns {BlockSet}
	 */
	copy() {
		return new BlockSet(this.type, this.indexI, this.indexJ, this.blockArray.map(block => block.copy()));
	}

	/**
	 * Copia el BlockSet con el movimiento aplicado
	 * @param {function} movement 
	 * @returns {BlockSet}
	 */
	move(movement) {
		let ret = this.copy();

		movement(ret);

		return ret;
	}

	/**
	 * Obtiene un Block en base a las coordenadas
	 * @param {number} i 
	 * @param {number} j 
	 * @param {Block}
	 */
	getBlock(i, j) {
		for(const block of this.blockArray) {
			if(block.indexI === i - this.indexI && block.indexJ === j - this.indexJ){
				return block;
			}
		}
		return null;
	}
}
