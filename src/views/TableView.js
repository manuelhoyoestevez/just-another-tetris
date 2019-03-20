export default class TableView {

	constructor (board) {
		this.board = board;
		let emptyText = document.createTextNode('');
		let table = document.createElement('table');

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

	refresh(){
		for(let i = 0; i < this.board.height; i++){
			for(let j = 0; j < this.board.width; j++){
				let block = this.board.getBlock(i, j);

				console.log('i', i, 'j', j, block);

				if(block !== null){
					this.tableNode.children[i].children[j].classList.add("filled");
				}
				else {
					this.tableNode.children[i].children[j].classList.remove("filled");
				}

			}
		}
	}

	fill(i, j){
		this.tableNode.children[i].children[j].classList.add("filled");
	}
}
