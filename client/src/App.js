import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loaded : false
    }
  }


  async componentDidMount(){
    const response = await fetch("https://randomuser.me/api/")
    const data = await response.json()


    this.setState({
      loaded : true,
      firstName : data.results[0].name.first,
      lastName : data.results[0].name.last,
      image : data.results[0].picture.large,
    })
  }

  async generate(){
    const response = await fetch("https://randomuser.me/api/")
    const data = await response.json()
    console.log(data)
    this.setState({
      loaded : true,
      firstName : data.results[0].name.first,
      lastName : data.results[0].name.last,
      image : data.results[0].picture.large,

    })
  }

  async word(){
    const word = document.getElementsByClassName("input")[0].value
    console.log(word)
    const url = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?ml=" + word
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
  }

  render(){
    return (
      <div className="App" style={{display: "flex", justifyContent: "space-evenly"}}>
        <div>
          <div> 
            {!this.state.loaded ? 
            <div>Loading...</div> 
            : 
            <div>
              <div>{this.state.firstName}</div>
              <div>{this.state.lastName}</div>
              <img src={this.state.image}></img>
            </div>
            }
          </div>
          <button onClick={() => this.generate()}>Generate</button>
        </div>
        <div>
          {this.state.words}
          <button onClick={() => this.word()}>Find</button>
          <input type='text' className="input"></input>
        </div>
      </div>
    );
  }
  
}

export default App;
