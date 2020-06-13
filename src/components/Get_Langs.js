import React  from 'react';

// import axios from 'axios';

export default class Get_Langs extends React.Component {
  // state = {
  //   langs_disp: []
  // }
  // componentDidMount() {
  //   // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  //   axios.get(`http://127.0.0.1:8000/v0/media/GET/video/`)
  //     .then(res => {
  //       const videos = res.data;
  //       const langs= videos[0].languages_suported
  //       this.setState({ videos , langs})
  //        }).catch(err=>{
  //     console.log(err);
  //     })
  // // }
  // state = {
  //   v: {langs_disp}
  // }
  // componentDidMount() {
  //   // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
  //   // axios.get(`http://127.0.0.1:8000/v0/media/GET/video/`)
  //     res => {
  //       const v = res.langs_disp;
  //       this.setState({ v })
  //        }
  // }

  render() {
    return (
    	<ul>
        {this.props.langs_disp.map(
          // v => 
          <li>{this.props.langs_disp.langs}</li> 
          )
        }
      </ul>
     
    )
  }
}