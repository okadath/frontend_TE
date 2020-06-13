import React from 'react';
import axios from 'axios';
// import Get_Langs from './Get_Langs';
// import React, {  Fragment } from 'react';
// import ReactDOM from 'react-dom';
export default class videosList extends React.Component {

  state = {
      videos: []
      }
  componentDidMount() {
    // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    axios.get(`http://127.0.0.1:8000/v0/media/GET/video/`)
      .then(res => {
        const videos = res.data;
        this.setState({ videos })
         }).catch(err=>{
      console.log(err);
      })
  }
  render() {
    return (
      <ul>
       { 
          this.state.videos.map(
            videos => 
              <li>{videos.title} 
              {
                  videos.languages_suported.map(
                    languages_suported => 
                    <ul>{languages_suported.lang}</ul>
                  )
              }
              </li>
          )
        }
      </ul>
    )
  }
}