import Engine from './model/Engine';
import TableView from './views/table/TableView';

let tetrisEngine = new Engine(10, 20);

let tetrisView = new TableView(tetrisEngine);

let viewDiv = document.getElementById('tetris-board');

viewDiv.appendChild(tetrisView.tableNode);

tetrisView.refresh();
