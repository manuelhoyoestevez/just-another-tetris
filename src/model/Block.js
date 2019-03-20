export default class Block {

	constructor (indexI, indexJ, type, status) {
		this.type = type;
		this.status = status;

		// Posición relativa al BlockSet
		this.indexI = indexI;
		this.indexJ = indexJ;
	}
}
