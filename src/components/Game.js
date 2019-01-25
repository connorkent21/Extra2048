import React, { Component } from 'react';
import Cube from "./Cube";

function getString(num){
  let name = "";
  switch (num){
    case 0:
      name = "defaultCube";
      break;
    case 2:
      name = "two";
      break;
    case 4:
      name = "four";
      break;
    case 8:
      name = "eight";
      break;
    case 16:
      name = "sixteen";
      break;
    case 32:
      name = "thirty-two";
      break;
    case 64:
      name = "sixty-four";
      break;
    case 128:
      name = "one-twenty-eight";
      break;
    case 256:
      name = "two-fifty-six";
      break;
    case 512:
      name = "five-twelve";
      break;
    case 1024:
      name = "ten-twenty-four";
      break;
    case 2048:
      name = "twenty-forty-eight";
      break;
  }
  return name;
}


class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameGrid: [
        [256, 128, 8, 0],
        [512, 64, 4, 0],
        [1024, 32, 2, 0],
        [2048, 16, 0, 0],
      ],
      formattedArray: [],
gameStarted: false,
    };
    this.mapArray = this.mapArray.bind(this);
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
    this.mapArray();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
      this.state.gameGrid.forEach(row => {

      })
  }
  handleKeyDown(keyPress) {
    if(!this.state.gameStarted) {
      this.startGame();
    }
    this.invertArray(keyPress.key);
    this.handleNumberMoves();
    this.revertArray(keyPress.key);
    this.addNumber();
  }

  startGame() {
    if (!this.state.gameStarted) {
      for(let i = 0; i < 2; i++) {
        let index = Math.Floor(Math.random() * (this.state.gameGrid.length + 1));
        this.state.gameGrid[parseInt(index / 4)][index % 4] = this.newNumber();
      }
      this.state.gameStarted = 1;
    }
  }

  invertArray(keyPress) {
    let { gameGrid } = this.state;
    let rotates;

    if (keyPress == 'ArrowLeft') {
      rotates = 0;
    }
    else if (keyPress == 'ArrowUp') {
      rotates = 1;
    }
    else if (keyPress == 'ArrowRight') {
      rotates = 2;
    }
    else if (keyPress == 'ArrowDown') {
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
          this.state[x][y] = this.state[y][this.state[0].length-1-x];

          // move values from bottom to right
          this.state[y][this.state[0].length-1-x] = this.state[this.state[0].length-1-x][this.state[0].length-1-y];

          // move values from left to bottom
          this.state[this.state[0].length-1-x][this.state[0].length-1-y] = this.state[this.state[0].length-1-y][x];

          // assign temp to left
          this.state[this.state[0].length-1-y][x] = temp;
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

    if (keyPress === 'ArrowLeft') {
      revertMove = 'ArrowLeft';
    }
    else if (keyPress === 'ArrowDown') {
      revertMove = 'ArrowUp';
    }
    else if (keyPress === 'ArrowRight') {
      revertMove = 'ArrowLeft';
    }
    else if (keyPress === 'ArrowUp') {
      revertMove = 'ArrowDown';
    }
    this.invertArray(revertMove);
  }

  addNumber(){
    let zeroList;
    this.state.gameGrid.forEach(row => {
      row.forEach(block => {
        if (block == 0) {
          zeroList.push(this.state.gameGrid.indexOf(row) * 4 + row.indexOf(block));
        }
      })
    })

    let newDigit = this.newNumber()
    let index = zeroList[Math.Floor(Math.random() * (zeroList.size() + 1))];
    this.state.gameGrid[parseInt(newDigit / 4)][newDigit % 4] = newDigit;
  }

  newNumber(){
    let newNumber = 2;
    let randomNumber =  Math.random() * 9;
    if (Math.floor(randomNumber) == 8) {
      newNumber = 4;
    }
    return newNumber;
  }

  handleKeyDown(e) {
    console.log('this is the evenT: ', e);
  }


  mapArray() {
    let phatArray = [];
    this.state.gameGrid.forEach(row => {
      row.forEach(entry => {
        phatArray.push(entry);
        this.state.formattedArray.push(entry);
        this.forceUpdate();
      })
    });
  }

  render() {
    return(
      <div>
        <h1 className="header">2048 Game!</h1>
        <p className="nameHeader">Created By: "The Building Scalars"</p>
          <div className='container'>
            <div className="containerGrid">
              {this.state.formattedArray.map(entry => {
                console.log("sting val: ", getString(entry));
                return(
                  <Cube value={entry} valueString={getString(entry)} />
                )
              })}
            </div>
          </div>
      </div>
    )
  }
}

export default Game;
