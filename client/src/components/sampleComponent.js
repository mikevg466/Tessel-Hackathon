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
    this.getComponent = getComponent.bind(this)
  }

  componentDidMount() {
    this.temperatureId = setInterval( () => {
      console.log('making request');
      // var req = http.get(getOptions, function(res) {
      // var req = http.get('http://192.168.3.97:3000/tessel', function(res){
      axios.get('http://192.168.3.97:3000/tessel', getOptions)
      .then((res) => {
        console.log(res.data.temperature);
        store.dispatch(updateTemperature(res.data.temperature));
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
            {this.getComponent(this.props.temperature)}
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
    <div className="row">
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/rainbows.gif"></img>
      </div>
      <div className="col-lg-5 col-md-5 col-sm-5">
        <img src="/images/Geoff-Face.jpg"></img>
      </div>
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/rainbows.gif"></img>
      </div>
    </div>
  );
}

function componentB(){
  return (
    <div className="row">
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/penguins.gif"></img>
      </div>
      <div className="col-lg-5 col-md-5 col-sm-5">
        <img src="/images/Cold-Temp.png"></img>
      </div>
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/penguins.gif"></img>
      </div>
    </div>
  );
}

function componentC(){
  return (
    <div className="row">
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/hotPeppers.jpeg"></img>
      </div>
      <div className="col-lg-5 col-md-5 col-sm-5">
        <img src="/images/hotTemp.png"></img>
      </div>
      <div className="sideImg col-lg-2 col-md-2 col-sm-2">
        <img className="sideImage" src="/images/hotPeppers.jpeg"></img>
      </div>
    </div>
  );
}

  var test = 2;
  function getComponent(temp){
    if(+temp <= 77) return componentB();
    if(+temp <= 78) return componentA();
    return componentC();
  }
