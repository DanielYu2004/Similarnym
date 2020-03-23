import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loading : false,
      suggested : [],
      selected : null
    }
    this.word = this.word.bind(this)
  }

  componentDidMount(){
    const node = document.getElementsByClassName("input")[0];
    node.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          if (node.value != ""){
            this.word()
          }
        }
        if (event.key === "ArrowDown") {
          if (this.state.selected === null){
            this.setState({
              selected : 0
            })
            node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent
          }
          else if (this.state.selected < this.state.suggested.length - 1){
            this.setState( (prevState) => {
              return({selected : prevState.selected + 1})
            })
            node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent

          }
        }
        if (event.key === "ArrowUp"){
          if (this.state.selected > 0){
            this.setState((prevState) => {
              return({selected : prevState.selected - 1})
            })
            console.log(this.state.selected)
          }
          node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent


        }
    });
    console.log(this.state.selected)
    
  }

  async word(){

    const word = document.getElementsByClassName("input")[0].value
    if (word != ""){
      this.setState({
        suggested: null, 
        loading: true
      })
      console.log("sending word:" , word)
      const url = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?max=20&ml=" + word
      const response = await fetch(url)
      const data = await response.json()
  
      console.log("Receieved data:", data)
      const results = []
  
      for (var i = 0; i < data.length; i++){
        results.push(data[i].word)
      }

      this.setState({
        words: results,
        suggested : null,
        loading : false,
        selected : null
      })

      document.getElementsByClassName("input")[0].value = ""

    }
  }

  suggested(e){
    const text = e.target.textContent
    document.getElementsByClassName("input")[0].value = text
    this.word()

  }

  async inputChange(){
    const text = document.getElementsByClassName("input")[0].value
    console.log(text)
    if (text == ""){
      this.setState({
        suggested : null
      })
    }
    else{
      const response = await fetch("https://api.datamuse.com/sug?max=8&s=" + text)
      const data = await response.json()
      console.log(data)
  
      const suggest = []
    
      for (var i = 0; i < data.length; i++){
        suggest.push(data[i].word)
      }
  
      this.setState({
        suggested : suggest
      })
    }
  }
  render(){
    return (
      <div className="App" >
        <div className="content-div">
          <div class="title-div">
            Similarnym Finder
          </div>
          <div>
            <div className="input-div">
              <button className="btn btn-primary" onClick={() => this.word()} >Find</button>
              <div className="text-input">
                <input type='text' className="input form-control" placeholder="Search a word" onInput={ () => this.inputChange()}></input>
                <div className="suggested-div">
                  <ul className="suggested-list"> 
                    {this.state.suggested ? this.state.suggested.map((word,key) => 
                    {if (key == this.state.suggested.length-1){
                    return <li style={{borderRadius: "0 0 7px 7px"}}key={key}className="suggested-li" onClick={(e) => this.suggested(e)}><div className="li-word">{word}</div></li>
                    }
                    else{
                    return <li key={key}className="suggested-li" onClick={(e) => this.suggested(e)}><div className="li-word">{word}</div></li>
                    }
                    }) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="words-div">
            {this.state.words  && !this.state.loading ? this.state.words.map((word, key) => <div key={key} style={{margin: "10px"}}>{word}</div>) : (this.state.loading ? <div> Loading... </div>: null)}
          </div>
        </div>     
        <div className="filler-div"></div>
        <div className="footer-div">
          footer
        </div>
      </div>
    );
  }
  
}

export default App;
