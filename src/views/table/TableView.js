export default class TableView {

	constructor (engine) {
		this.engine = engine;
		let emptyText = document.createTextNode('');
		let table = document.createElement('table');

		for(let i = 0; i < this.engine.height; i++){
			let tr = document.createElement('tr');
			for(let j = 0; j < this.engine.width; j++){
				let td = document.createElement('td');
				
				td.appendChild(emptyText);
				
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		this.tableNode = table;
	}

	refresh(){
		for(let i = 0; i < this.engine.height; i++){
			for(let j = 0; j < this.engine.width; j++){
				let block = this.engine.getBlock(i, j);
				if(block !== null){
					this.tableNode.children[i].children[j].classList.add("filled");
				}
			}
		}
	}

	fill(i, j){
		this.tableNode.children[i].children[j].classList.add("filled");
	}
}
