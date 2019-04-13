import Board from './model/Board';
import Levels from './model/Levels';
import TableView from './views/TableView';

export default class Engine {

  constructor () {
	this.board = null;
	this.preboard = null;
    this.view = null
	this.interval = null;
	this.preview = null;
    this.paused = false;
    this.level = 0;
    this.lines = 0;
	this.score = 0;
    this.tic = 0;
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

  init(width, height, tetrisNode, previewNode) {
	this.board = new Board(width, height);
	this.preboard = new Board(6, 6);

    //this.board.generateRandomBlocks(10);

	this.view = new TableView(this.board);
	this.preview = new TableView(this.board);

	tetrisNode.appendChild(this.view.tableNode);
	previewNode.appendChild(this.preview.tableNode);
    this.view.refreshAll();
  }

  start() {
    this.resume();
  }

  stop() {

  }

  pauseOrResume() {
    this.paused ? this.resume() : this.pause();
  }

  pause() {
    this.paused = true;
    this.view.setPaused(this.paused);
    clearInterval(this.interval);
  }

  resume() {
    this.paused = false;
    this.view.setPaused(this.paused);
    this.interval = setInterval(() => {
      if(this.tic++ % Levels[this.level]['speedTime'] == 0){
        this.move('down');
      }
    }, 10);
  }

  move(movement) {
    let ret = this.board.move(movement);

    if(ret.gameover){
      clearInterval(this.interval);
      this.view.gameOver();
      return ret;
    }

    else if(ret.crash && ret.movement === 'down') {
      this.score++;
      document.getElementById('score').textContent = this.score;
      
      if(ret.lines.length > 0){
        this.lines += ret.lines.length;

        for(let i = this.level; i < Levels.length; i++){
          if(this.lines >= Levels[i]['lines']){
            this.level = i;
          }
          else {
            break;
          }
        }

        document.getElementById('lines').textContent = this.lines;
        document.getElementById('level').textContent = this.level;
      }
    }

    this.view.move(ret);
    return ret;
  }
}
