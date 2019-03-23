import Board from './model/Board';
import Levels from './model/Levels';
import TableView from './views/TableView';

export default class Engine {

	constructor (width, height) {
		this.board = new Board(width, height);
		this.view = new TableView(this.board);
		this.interval = null;
		this.paused = false;
		this.level = 0;
	}

	draw(node) {
		node.appendChild(this.view.tableNode)
	}

	refreshAll() {
		this.view.refreshAll();
	}

	get height() {
		return this.board.height;
	}

	get width() {
		return this.board.width;
	}

	getBlock(i, j) {
		return this.board.getBlock(i, j);
	}

	start() {
		this.board = new Board(this.width, this.height);
		this.view.refreshAll();
		this.resume();
	}

	pause() {
		this.paused = true;
		this.view.setPaused(this.paused);
		clearInterval(this.interval);
	}

	resume() {
		this.paused = false;
		this.view.setPaused(this.paused);
		this.interval = setInterval(() => { this.move('down'); }, Levels[this.level]['speedTime']);
	}

	move(movement) {
		let ret = this.board.move(movement);

		// Pueden pasar varias cosas
		// La vista debe actuar en consecuencia

		this.view.move(ret);
		return ret;
	}
}
