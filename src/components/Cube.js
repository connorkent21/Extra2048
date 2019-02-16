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
    console.log('this is the hex number:', this.props.value.toString(this.props.base));
    return(
      <div className={this.props.page.state.base == 2 ? `cubeItem ${this.props.valueString} binary` : `cubeItem ${this.props.valueString}`}>
        <p>{this.props.value ? this.props.value.toString(this.props.base) : ""}</p>
      </div>
    )
  }


}

export default Cube;
