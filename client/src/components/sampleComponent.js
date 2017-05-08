import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

// Project Dependencies
import { updateMessage, amountOfMessages } from '../reducers/dummyReducer';

import './sampleComponentStyle.scss';

class SampleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.messageNumber = 0;
    //attach bound functions here
    //this.func = this.func.bind(this)
  }

  componentDidMount() {
    // this.messageId = setInterval( () => {
    //   //incrememnt message id and send to reducer
    //   this.changeMessage();
    // }, 1000);

    // this.temperatureId = setInterval( () => {
    //   //incrememnt message id and send to reducer
    //   this.changeMessage();
    // }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.messageId);
    // clearInterval(this.temperatureId);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div id="Geoff" className="col-lg-10 col-md-10 col-sm-12">
            {getComponent()}
          </div>
          <div id="temperature" className="col-lg-2 col-md-2 col-sm-12">
            <h2>{this.props.temperature}</h2>
          </div>
        </div>
      </div>
    );
  }

  changeMessage() {
    ++this.messageNumber;
    if (this.messageNumber > amountOfMessages) {
      this.messageNumber = 0;
    }
    store.dispatch(updateMessage(this.messageNumber));
  }
}

var temperature = 87;
// EXAMPLE
const mapState = state => {
  // The reducers are combined in reducers/index.js and that is where their name is set
  // The format is state.REDUCERNAME.propertyOfREDUCERNAME
  return {
    temperature: state.dummyReducer.temperature
  };
};

// Unused example mapDispatch function
// const mapDispatch = state => {
//   return {};
// }

export default connect(mapState, null)(SampleComponent);

function componentA(){
  return (
    <img src="/images/Geoff-Face.jpg"></img>
  );
}

function componentB(){
  return (
    <img src="/images/Cold-Temp.png"></img>
  );
}

function componentC(){
  return (
    <img src="/images/hotTemp.jpg"></img>
  );
}

  var test = 2;
  function getComponent(){
    if(test === 0) return componentA();
    if(test === 1) return componentB();
    return componentC();
  }
