import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null
    };
  }
  loadData(page, perPage){
    fetch("https://reqres.in/api/example?per_page=" + perPage + "&page=" + page)
      .then(response => response.json())
      .then(data => this.setState({data}));
  }
  render() {
    const { data } = this.state;
    if (data != null){

    var blocks = [];
    var totalonpage;
    var remaining = data.total - (data.page - 1) * data.per_page;
    
    if (data.per_page > remaining)
        totalonpage = remaining
    else
        totalonpage = data.per_page

    console.log(data);
    for (var i = 0; i < totalonpage ; ++i){
        blocks.push(<div className="block" style={{  backgroundColor: data.data[i].color, borderColor: data.data[i].color, width:'150px',height:'150px'}}><div style={{color: "black", marginTop:"70px"}}>{data.data[i].name}</div></div>)
    }
      return (
        <div className="App">
          <header className="App-header">
          <h6>Page number: {data.page}</h6>

          <div id="parent">{blocks}
          <button style={{float:"left"}} onClick={() => {this.loadData(data.page - 1, data.per_page)}}>Prev</button><button style={{float:"right"}} onClick={() => {this.loadData(data.page + 1, data.per_page)}}>Next</button>

          </div>
          </header>
        </div>
      );
    }
    return null;
  }
  componentDidMount() {
      this.loadData(1,8);
  }
}



export default App;
