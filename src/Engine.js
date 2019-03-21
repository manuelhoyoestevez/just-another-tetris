import Block from './model/Block';
import BlockSet from './model/BlockSet';
import Board from './model/Board';
import TableView from './views/TableView';

export default class Engine {

	constructor (width, height) {
		this.board = new Board(width, height);
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

	move(movement){
		return this.board.move(movement);
	}
}
