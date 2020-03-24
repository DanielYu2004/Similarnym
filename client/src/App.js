import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      loading : false,
      suggested : [],
      selected : null, 
      word : null
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

        if (this.state.suggested.length != 0){
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
            else if (this.state.selected == this.state.suggested.length - 1){
              this.setState({selected : 0})
              node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent
            }
          }
          if (event.key === "ArrowUp"){
            if (this.state.selected > 0 && this.state.selected < this.state.suggested.length){
              this.setState((prevState) => {
                return({selected : prevState.selected - 1})
              })
              node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent
            }
            else if (this.state.suggested.length <= this.state.selected){
              this.setState({selected : this.state.suggested.length - 2})
            }
            else if (this.state.suggested.length > 0){
              this.setState((prevState) => {
                return({selected : this.state.suggested.length - 1})
              })
              node.value = document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].textContent

            }
          }
          if (this.state.selected !== null){            
            for (var i = 0; i < this.state.suggested.length; i++){
              document.getElementsByClassName("suggested-list")[0].childNodes[i].classList.remove("selected");
              //document.getElementsByClassName("suggested-list")[0].childNodes[i].style.background = "#e4eaf5"
            }
            if (this.state.selected < this.state.suggested.length && this.state.selected >= 0){
              document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].classList.add("selected");
            }
            else{
              document.getElementsByClassName("suggested-list")[0].childNodes[this.state.suggested.length - 1].classList.add("selected");
            }

            //document.getElementsByClassName("suggested-list")[0].childNodes[this.state.selected].style.background = "black"
          }
        }
    });    
  }

  async word(){

    const word = document.getElementsByClassName("input")[0].value
    if (word != ""){
      this.setState({
        suggested: [], 
        loading: true,
        word : null,
        definition: null
      })
      console.log("sending word:" , word)
      const url = "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?max=70&ml=" + word
      const response = await fetch(url)
      const data = await response.json()
  
      console.log("Receieved data:", data)
      const results = []
  
      for (var i = 0; i < data.length; i++){
        results.push(data[i].word)
      }



      const responsee = await fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word +"?key=7e6d05cf-f2ff-4571-bcdc-c93c05e8a98b")
      const dataa = await responsee.json()
      console.log(dataa)
      
      var definition = "unavailable"
      if (dataa[0] != undefined){
        if (dataa[0].shortdef != undefined){
          var definition = dataa[0].shortdef[0] 
        }
      }




      this.setState({
        words: results,
        suggested : [],
        loading : false,
        selected : null,
        word: word,
        definition: definition
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
        suggested : [],
        selected : null
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


  reset(){
    this.setState({
      definition: null,
      words : null, 
      word : null,
      suggested : [],
      selected : null
    })
  }
  render(){
    return (
      <div className="App" >
        <div className="content-div">
          <div class="title-div">
            <div onClick={() => this.reset()} className="title">Similarnym</div>
            <div className="subtitle">similar meanings with similar applications</div>

          </div>

          <div className="input-div">
              <button className="btn btn-primary" onClick={() => this.word()} >Find</button>
              <div className="text-input">
                <input type='text' className="input form-control" placeholder="Search something!" onInput={ () => this.inputChange()}></input>
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

          <div className="words-div">
            {this.state.word ? <div className="definition-div"><div className="definition-word">{this.state.word}</div><div className="definition">{this.state.definition}</div></div>: null}  
            {this.state.words  && !this.state.loading ? this.state.words.map((word, key) => <div className="word-syn" onClick={(e) => this.suggested(e)} key={key}>{word}</div>) : (this.state.loading ? <div> Loading... </div>: null)}
          </div>
        </div>     
        <div className="filler-div"></div>
        <div className="footer-div">
            Developed by Daniel Yu
        </div>
      </div>
    );
  }
  
}

export default App;
