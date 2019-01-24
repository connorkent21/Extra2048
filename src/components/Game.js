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

    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  };


  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
      this.state.gameGrid.forEach(row => {

      })
  }

  handleKeyDown(e) {
    console.log('this is the evenT: ', e);
  }






  render() {
    return(
      <div className='container'>
        <div className="containerGrid">
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
          <div className="cubeItem">
          </div>
        </div>

      </div>

    )
  }
}


export default Game;
