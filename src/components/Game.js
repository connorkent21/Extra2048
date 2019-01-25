import React, { Component } from 'react';




class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameGrid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],

    }
    this.startGame = this.startGame.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.invertArray = this.invertArray.bind(this);
    this.handleNumberMoves = this.handleNumberMoves.bind(this);
    this.revertArray = this.revertArray.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.newNumber = this.newNumber.bind(this);
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(keyPress) {
    this.invertArray(keyPress.key);
    this.handleNumberMoves();
    this.revertArray(keyPress.key);
    this.addNumber();
  }

  startGame() {
    for(let i = 0; i < 2; i++) {
      let index = Math.Floor(Math.random() * (this.state.gameGrid.length + 1));
      this.state.gameGrid[parseInt(index / 4)][index % 4] = newNumber();
    }
  }

  invertArray(keyPress) {
    let { gameGrid } = this.state;
    let rotates;

    if (keyPress === 'leftArrow') {
      rotates = 0;
    }
    else if (keyPress === 'upArrow') {
      rotates = 1;
    }
    else if (keyPress === 'rightArrow') {
      rotates = 2;
    }
    else if (keyPress === 'downArrow') {
      rotates = 3;
    }

    for (var i = 0; i < rotates; i++) {
      // Consider all squares one by one
      for (let x = 0; x < this.state[0].length / 2; x++)
      {
        // Consider elements in group of 4 in
        // current square
        for (let y = x; y < this.state[0].length-x-1; y++)
        {
          // store current cell in temp variable
          let temp = this.state[x][y];

          // move values from right to top
          mat[x][y] = mat[y][this.state[0].length-1-x];

          // move values from bottom to right
          mat[y][this.state[0].length-1-x] = mat[this.state[0].length-1-x][this.state[0].length-1-y];

          // move values from left to bottom
          mat[this.state[0].length-1-x][this.state[0].length-1-y] = mat[this.state[0].length-1-y][x];

          // assign temp to left
          mat[this.state[0].length-1-y][x] = temp;
        }
      }
    }
  }

  handleNumberMoves() {
    this.state.gameGrid.forEach(row => {
      let emptyBlock = 0;
      row.forEach(block => {
        if (block != 0) {
            row[emptyBlock] = block;
            block = 0;
            // Checks to see if the 2 blocks should merge
            if (emptyBlock != 0 && row[emptyBlock] == row[emptyBlock - 1]) {
              row[emptyBlock - 1] *= 2;
              row[emptyBlock] = 0;
            }
            // Otherwise, the first emptyBlock moves over once
            else {
              emptyBlock++;
            }
        }
      })
    })
  }

  revertArray(keyPress){
    let { gameGrid } = this.state;
    let revertMove;

    if (keyPress === 'leftArrow') {
      rotates = 'leftArrow';
    }
    else if (keyPress === 'downArrow') {
      rotates = 'upArrow';
    }
    else if (keyPress === 'rightArrow') {
      rotates = 'leftArrow';
    }
    else if (keyPress === 'upArrow') {
      rotates = 'downArrow';
    }
    this.invertArray(revertMove);
  }

  addNumber(){
    let zeroList;
    this.state.gameGrid.forEach(row => {
      row.forEach(block => {
        if (block == 0) {
          zeroList.push(gameGrid.indexOf(row) * 4 + row.indexOf(block));
        }
      })
    })

    let newDigit = newNumber()
    let index = zeroList[Math.Floor(Math.random() * (zeroList.size() + 1))];
    gameGrid[parseInt(newDigit / 4)][newDigit % 4] = newDigit;
  }

  newNumber(){
    let newNumber = 2;
    let randomNumber =  Math.random() * 9;
    if (Math.floor(randomNumber) == 8) {
      newNumber = 4;
    }
    return newNumber;
  }

  render() {
    return(
      <div className='container'>
        <div className='movingBlock' style={{top: '10px', left: '10px'}} ref={el => this.movingBlock = el}>
          {this.state.map(block => {
            return(
              blocks
            )
          })}
        </div>

      </div>

    )
  }
}


export default Game;
