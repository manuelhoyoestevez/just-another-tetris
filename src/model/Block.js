export default class Block {

	constructor (indexJ, indexI, type, status) {
		this.type = type;
		this.status = status;

		// Posición relativa al BlockSet
		this.indexI = indexI;
		this.indexJ = indexJ;
	}
	
}
