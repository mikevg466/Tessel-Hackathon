// const http = require('http');
const axios = require('axios');

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store.js';

// Project Dependencies
import { updateTemperature } from '../reducers/dummyReducer';

import './sampleComponentStyle.scss';

const getOptions = {

    mode: 'no-cors'
    // headers: {
    //   'Content-Type': 'application/json
};

class SampleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};



    //attach bound functions here
    //this.func = this.func.bind(this)
  }

  componentDidMount() {
    this.temperatureId = setInterval( () => {
      console.log('making request');
      // var req = http.get(getOptions, function(res) {
      // var req = http.get('http://192.168.3.97:3000/tessel', function(res){
      axios.get('http://192.168.3.97:3000/tessel', getOptions)
      .then((res) => {
        console.log(res.data.temperature);
      })
      .catch(console.error.bind(console))
      // req.on('error', function(err){
      //   console.log(err);
      // })
      // store.dispatch(updateTemperature());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.temperatureId);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div id="Geoff" className="col-lg-10 col-md-10 col-sm-12">
            {getComponent()}
          </div>
          <div id="temperature" className="col-lg-2 col-md-2 col-sm-12">
            <h2>The Temperature Is: {this.props.temperature} F</h2>
          </div>
        </div>
      </div>
    );
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
