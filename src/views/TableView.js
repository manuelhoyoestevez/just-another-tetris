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
			let tr = document.createElement('tr');
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
		this.refreshAll();
	}

	refreshAll() {
		for(let i = 0; i < this.board.height; i++){
			for(let j = 0; j < this.board.width; j++){
				let block = this.board.getBlock(i, j);

				if(block !== null){
					this.tableNode.children[i].children[j].classList.add("filled");
					this.tableNode.children[i].children[j].classList.add(block.type);
				}
				else {
					this.tableNode.children[i].children[j].classList.remove('filled')
				}
			}
		}
	}
}
