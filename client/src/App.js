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
    const wordss = []
    var i;
    for (i = 0; i < data.length; i++){
      wordss.push(<div style={{margin: "10px"}}>{data[i].word}</div>)
    }
    this.setState({
      words : [wordss]
    })
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
        <div style={{width : "400px", display: "flex", flexDirection: "column"}}>
          <div>
            <button onClick={() => this.word()}>Find</button>
            <input type='text' className="input"></input>
          </div>

          <div style={{width: "400px", display: "flex", flexWrap: "wrap"}}>
            {this.state.words ? 

            this.state.words
            : 
            <div></div>
            }
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
