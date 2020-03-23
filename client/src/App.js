import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loaded : false
    }
    this.word = this.word.bind(this)
  }

  componentDidMount(){
    const node = document.getElementsByClassName("input")[0];
    console.log(node)
    node.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          this.word()
        }
    });
  }

  async word(){
    const word = document.getElementsByClassName("input")[0].value
    console.log(word)
    const url = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?ml=" + word
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
    const results = []

    for (var i = 0; i < data.length; i++){
      results.push(data[i].word)
    }
    console.log(results)
    this.setState({
      words: results
    })
  }

  render(){
    return (
      <div className="App" >
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems : "center"}}>
          <div style={{display: "flex", width: "80%", flexWrap: "wrap"}}>
            {this.state.words ? this.state.words.map((word, key) => <div key={key} style={{margin: "10px"}}>{word}</div>) : null}
          </div>
          <div>
            <button onClick={() => this.word()}>Find</button>
            <input type='text' className="input"></input>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
