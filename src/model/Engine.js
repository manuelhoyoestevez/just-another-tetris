import Block from './Block';
import BlockSet from './BlockSet';
import Board from './Board';

export default class Engine {

	constructor (width, height) {
		let blocks = [
		  new Block(-1, 0, 1, 0),
		  new Block(-1,-1, 1, 0),
		  new Block( 0,-1, 1, 0),
		  new Block( 1,-1, 1, 0)
		];

		this.blockSet = new BlockSet(5, 5, blocks);
		this.board = new Board(width, height, this.blockSet);
	}

	get height() {
		return this.board.height;
	}

	get width() {
		return this.board.width;
	}

	getBlock(i, j){
		return this.board.getBlock(i, j);
	}
}
