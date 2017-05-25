import React from 'react';
import ReactDOM from 'react-dom';
import config from './config.js';
import axios from 'axios';
import mhc_comment from './mhc_comment.js';
import './style.scss'

const dateFormat = (timestamp) => {
  var date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { comment } = this.props;
    const { time, avatar, name, content } = comment;
    const avatarStyle = {
      background: `url(\"${ avatar }\") center`,
      backgroundSize: "contain"
    }
    return (
      <div className="comment_item">
        <div className="left">
          <div className="avatar" style={ avatarStyle }></div>
        </div>
        <div className="right">
          <div className="info">
            <span className="user_name"> { name } </span>·
            <span className="time_info"> { dateFormat(time) } </span>
          </div>
          <div className="content">
            { content }
          </div>
        </div>
      </div>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494947922588&di=3ee6a91dffc18275806a76f34c073cba&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2014-08-28%2F122335664.jpg",
        time: new Date().getTime(),
        name: "GUOSHENCHENG",
        content: "hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494947922588&di=3ee6a91dffc18275806a76f34c073cba&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2014-08-28%2F122335664.jpg",
        time: new Date().getTime(),
        name: "GUOSHENCHENG",
        content: "hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga"
      },
      {
        avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494947922588&di=3ee6a91dffc18275806a76f34c073cba&imgtype=0&src=http%3A%2F%2Fwww.jf258.com%2Fuploads%2F2014-08-28%2F122335664.jpg",
        time: new Date().getTime(),
        name: "GUOSHENCHENG",
        content: "hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga hshehehlakhdaldjhfaljga"
      }     
      ]
    }
  }
  componentDidMount() {
    axios.get(`${config.host}/comments`, { 
      params: {
        url: window.location.href,
      },
      withCredentials: true
    }).then(response => {
      // const { data } = response;
      // this.setState({
        // comments: data
      // })
    }).catch(reason => {
      console.log(reason);
    })
  }
  
  render() {
    const { comments } = this.state;
    return (
      <div id="comment_container">
        <div className="comment_list">
          { comments.map((comment, index)=> {
            return <CommentItem key={ index } comment={ comment } ></CommentItem>
          }) }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Container></Container>,
  document.querySelector('#mhc_comment')
)

