import React from 'react';
import axios from 'axios';
 
export default class ListaPersonas extends React.Component {
  state = {
    name: '',
  }
 
  handleChange = event => {
    this.setState({
      // name: event.target.value,
      code: event.target.value, 
   });
  }
 
  handleSubmit = event => {
    event.preventDefault();
 
    const cod = {
      // name: this.state.name,
      code:  this.state.code,
      validity_begins: "2019-12-26" ,
      validity_expires:"2019-12-26", 
      license: 1 
    };
 
    axios.post(`http://127.0.0.1:8000/v0/user/POST/code/`,  cod )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
 
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Codigo:
            <input type="text" name="code" onChange={this.handleChange} />
          </label>
          <br/>
          <button type="submit">Agregar Codigo</button>
        </form>
      </div>
    )
  }
}