import React from 'react';
import ReactDOM from 'react-dom';
import config from './config.js';
import axios from 'axios';

import './style.scss'
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    axios.get(`${config.host}/comments`, { params: {
      url: window.location.href
    }}).then(response => {
      const { data } = response;
      this.setState({
        comments: data
      })
    }).catch(reason => {
      console.log(reason);
    })
  }
  
  render() {
    const { comments } = this.state;
    return (
      <div id="comment_container">
        
      </div>
    );
  }
}



ReactDOM.render(
  <Container></Container>,
  document.querySelector('#mhc_comment')
)

