import './App.css';
import React, {Component, useCallback } from  'react';
import ImageRecog from './components/ImageRecog/ImageRecog';
import SearchBar from './components/SearchBox/SearchBar';
import LogoIcon from './components/Logo/LogoIcon';
import NavBar from './components/Navigation/NavBar';
import Rank from './components/Rank/Rank';
import tachyons from 'tachyons'; 
import Particle from './components/Particle/Particle';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

console.log(Clarifai);

const USER_ID = 'brigu';
const PAT = '4a87e44705d34eca9e50d930b0b595ed';
const APP_ID = '77a2a2fda2ab41538360d940a3821b40';
const MODEL_ID = 'a403429f2ddf4b49b307e318f00e528b';
const MODEL_VERSION_ID = '34ce21a40cc24b6b96ffee54aabff139';  


class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin'
    }
  }
  
  calculateBoxLocation = (data) => {
    
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      left: faceBox.left_col * width,
      top: faceBox.top_row * height,
      right: width - (faceBox.right_col * width),
      bottom: height - (faceBox.bottom_row * height)
    }

  }

  faceRegion = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonDetect = () => {
    console.log('click');
    this.setState({imgUrl: this.state.input})
  
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => this.faceRegion(this.calculateBoxLocation(result)))
            .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render(){
    return (
      <div className="App">
        <Particle />
        {this.state.route === 'home' ? 
          <div>
            <NavBar onRouteChange={this.onRouteChange}/>
            <LogoIcon />
            <Rank />
            <SearchBar onInputChange={this.onInputChange} onButtonDetect={this.onButtonDetect} />
            <ImageRecog faceArea={this.state.box} newImage={this.state.imgUrl} />
          </div>
          :(
            this.state.route === 'signin'?
            <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>          
          ) 
        }
      </div>
    );
  }
}

export default App;


