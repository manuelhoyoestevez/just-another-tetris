import Block from './model/Block';
import BlockSet from './model/BlockSet';
import Board from './model/Board';
import TableView from './views/TableView';

export default class Engine {

	constructor (width, height) {
		let blocks = [
		  new Block(-1, 0, 1, 0),
		  new Block(-1,-1, 1, 0),
		  new Block( 0,-1, 1, 0),
		  new Block( 1,-1, 1, 0)
		];

		this.blockSet = new BlockSet(2, 2, blocks);
		this.board = new Board(width, height, this.blockSet);
		this.view = new TableView(this.board);
	}

	draw(node){
		node.appendChild(this.view.tableNode)
	}

	refresh(){
		this.view.refresh();
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

	moveLeft(){
		return this.board.moveLeft();
	}

	moveRight(){
		return this.board.moveRight();
	}
}
