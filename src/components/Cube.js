/*
2
4
8
16
32
64
128
256
512
1024
2048
4096
8192
*/

import React, { Component } from 'react';

class Cube extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  };

  render(){
    return(
      <div className={`cubeItem ${this.props.valueString}`}>
        <p>{this.props.value ? this.props.value : ""}</p>
      </div>
    )
  }


}

export default Cube;
