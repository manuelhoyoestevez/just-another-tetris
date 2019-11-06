export default class TableView {

	constructor(board) {
		this.paused = false;
		this.setBoard(board);
	}

	setBoard(board) {
		this.board = board;
		let emptyText = document.createTextNode('');
		let table = document.createElement('table');
		table.setAttribute('class', 'tetris-board');

		for(let i = 0; i < this.board.height; i++){
			const tr = document.createElement('tr');
			for(let j = 0; j < this.board.width; j++){
				let td = document.createElement('td');
				td.appendChild(emptyText);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		this.tableNode = table;
	}

	setPaused(paused) {
		this.paused = paused;
	}

	move(movementResult) {
		for(let line of movementResult.lines){
			this.clearLine(line);
		}

		for(let change of movementResult.changes){
			this.refreshBlock(change[0], change[1]);
		}
	}
	
	fillBlock(i, j, block) {
		this.tableNode.children[i].children[j].classList.add("filled");
		this.tableNode.children[i].children[j].classList.add(block.type);
	}

	clearBlock(i, j) {
		this.tableNode.children[i].children[j].classList.remove('filled');
		for(let tetrominoType of this.board.tetrominos){
			this.tableNode.children[i].children[j].classList.remove(tetrominoType);
		}
	}

	refreshBlock(i, j) {
		if(this.board.inBoard(i, j)){
			let block = this.board.getBlock(i, j);
			
			if(block === null){
				this.clearBlock(i, j);
			}
			else {
				this.fillBlock(i, j, block);
			}
		}
	}

	refreshAll() {
		for(let i = 0; i < this.board.height; i++){
			for(let j = 0; j < this.board.width; j++){
				this.refreshBlock(i, j);
			}
		}
	}

	clearLine(i) {
		let j = 0;
		let limit = this.board.width;
		let _this = this;
		let interval = setInterval(() => {
			if(j >= limit){
				clearInterval(interval);
				_this.refreshAll();
			}
			else {
				_this.clearBlock(i, i % 2 == 0 ? j++ : limit - j++ - 1);
			}
		}, 50);
	}

	gameOver() {
		let _this = this;
		let interval = setInterval(() => {
			let block = _this.board.generateRandomBlock();
			if(block === null){
				clearInterval(interval);
			}
			else {
				_this.fillBlock(block.indexI, block.indexJ, block);
			}
		}, 10);
	}
}
