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
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      formattedArray: [],
      gameStarted: false,
      xLoc: 0,
      yLoc: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
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

    let outStr = "";
    this.state.gameGrid.forEach(row => {
      row.forEach(block => {
        outStr += block + " ";
      })
      outStr += "\n";
    })
    console.log(outStr);
    
  }

  startGame() {
    if (!this.state.gameStarted) {
      for(let i = 0; i < 2; i++) {
        this.addNumber();
      }
      this.state.gameStarted = 1;
    }
  }

  invertArray(keyPress) {
    console.log(keyPress);
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
      for (let x = 0; x < this.state.gameGrid[0].length / 2; x++)
      {
        // Consider elements in group of 4 in
        // current square
        for (let y = x; y < this.state.gameGrid[0].length-x-1; y++)
        {
          // store current cell in temp variable
          let temp = this.state.gameGrid[x][y];

          // move values from right to top
          this.state.gameGrid[x][y] = this.state.gameGrid[y][this.state.gameGrid[0].length-1-x];

          // move values from bottom to right
          this.state.gameGrid[y][this.state.gameGrid[0].length-1-x] = this.state.gameGrid[this.state.gameGrid[0].length-1-x][this.state.gameGrid[0].length-1-y];

          // move values from left to bottom
          this.state.gameGrid[this.state.gameGrid[0].length-1-x][this.state.gameGrid[0].length-1-y] = this.state.gameGrid[this.state.gameGrid[0].length-1-y][x];

          // assign temp to left
          this.state.gameGrid[this.state.gameGrid[0].length-1-y][x] = temp;
        }
      }
    }
  }

  handleNumberMoves() {
    let moved = false;
    this.state.gameGrid.forEach(row => {

      let emptyIndex = 1;
      if (row[0] == 0)
        emptyIndex = 0;
      
      for (let i = 1; i < row.length; i++) {

        console.log(i + ": " + emptyIndex);
        
        if (row[i] == 0) {

        }
        // check if merge is possible
        else if (row[i] == row[emptyIndex-1]) {
          row[emptyIndex-1] *= 2;
          row[i] = 0;
          console.log("test");
        }
        // if emptyIndex does not equal index of block
        // then move into emptyIndex
        else if (emptyIndex != i) {
          row[emptyIndex] = row[i];
          row[i] = 0;
          emptyIndex++;
        } else {
          emptyIndex++;
        }
      }
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
      revertMove = 'ArrowRight';
    }
    else if (keyPress === 'ArrowUp') {
      revertMove = 'ArrowDown';
    }
    this.invertArray(revertMove);
  }

  addNumber(){
    let zeroList = [];
    this.state.gameGrid.forEach(row => {
      row.forEach(block => {
        if (block == 0) {
          zeroList.push(this.state.gameGrid.indexOf(row) * 4 + row.indexOf(block));
        }
      })
    })

    let newDigit = this.newNumber()
    let index = zeroList[Math.floor(Math.random() * (zeroList.length))];
    this.state.gameGrid[Math.floor(index / 4)][index % 4] = newDigit;
  }

  newNumber(){
    let newNumber = 2;
    let randomNumber =  Math.random() * 10;
    if (Math.floor(randomNumber) == 0) {
      newNumber = 4;
    } 
    return newNumber;
  }
  mapArray() {
    this.state.gameGrid.forEach(row => {
      row.forEach(entry => {
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
                          return(
                              <Cube value={entry} valueString={getString(entry)}/>
                          )
                      })}
                  </div>
              </div>
          </div>
      )
  }
}

export default Game;
