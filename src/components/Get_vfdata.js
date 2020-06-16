import React  from 'react';

import axios from 'axios';

export default class VideoForeignDataList extends React.Component {
  state = {
    persons: []
  }
  componentDidMount() {
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.get(`http://127.0.0.1:8000/v0/media/GET/VideoForeignData/`)
    
      .then(res => {
        const persons = res.data;
        this.setState({ persons })
         }).catch(err=>{
      console.log(err);
      })
  }

  render() {
    return (
      <br/>
      // <ul>
      //   { this.state.persons.map(
      //     person => 
      //     <li>{person.title}</li> 
      //     )
      //   }
      // </ul>
    )
  }
}