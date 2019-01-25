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
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.mapArray = this.mapArray.bind(this);
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
