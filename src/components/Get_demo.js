import React, {  Fragment } from 'react';
import axios from 'axios';
import Get_vfdata from './Get_vfdata';
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

              <p>slug:<p><ul>{videos.slug}</ul></p></p>
              <p>uri:<ul>{videos.video_uri}</ul></p>
              <p>description:<ul>{videos.description}</ul></p>
              <p>featured:<ul>{videos.featured}</ul></p>
              <p>avaible:<ul>{videos.available}</ul></p>
              <p>thumbnail:<ul>{videos.thumbnail}</ul></p>
              <p>speaker:<ul>{videos.speaker}</ul></p>
              <p>year:<ul>{videos.year}</ul></p>
              <p>category:<ul>{videos.category}</ul></p>
              <p>topic:<ul>{videos.topic}</ul></p>
              langs:<ul>
              {
                  videos.languages_suported.map(
                    languages_suported => 
                    <Fragment>
                    <ul>{languages_suported.lang}</ul>
                    <Get_vfdata >asd</Get_vfdata>
                    </Fragment>
                  )
              }</ul>
              </li>
          )
        }
      </ul>
    )
  }
}