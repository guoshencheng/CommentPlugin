import React from 'react';
import ReactDOM from 'react-dom';
import config from './config.js';
import axios from 'axios';
import mhc_comment from './mhc_comment.js';
import './style.scss'

const dateFormat = (timestamp) => {
  var date = new Date(parseInt(timestamp));
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { comment } = this.props;
    const { time, avatar, username } = comment;
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
            <span className="user_name"> { username } </span>·
            <span className="time_info"> { dateFormat(time) } </span>
          </div>
          <div className="content">
            { comment.comment }
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
      user: {
      },
      comments: []
    }
  }
  componentDidMount() {
    mhc_comment.comments().then(data => {
      this.setState({
        comments: data
      })
    });
    this.getUser();
  }

  getUser() {
    mhc_comment.user().then(data => {
      if (!data.noCookie) {
        this.setState({
          user: data
        })
      }
    })
  }

  loginGithub() {
    mhc_comment.login(() => {
      this.getUser()
    })
  }

  createComment() {
    const { user, comments } = this.state;
    const textarea = this.refs.textarea;
    console.log(textarea.text, textarea.value)
    if ( textarea.value && textarea.value != "" ) {
      mhc_comment.createComment({
        username: user.name,
        avatar: user.avatar_url,
        comment: textarea.value,
        url: window.location.href,
        time: new Date().getTime()
      }).then(data => {
        this.setState({
          comments: comments.concat([data])
        })
        textarea.value = "";
      });
    }
  }

  render() {
    const { comments, user } = this.state;
    const avatarStyle = {
      background: `url(\"${ user.avatar_url}\") center`,
      backgroundSize: "contain"
    }
    console.log(user);
    return (
      <div id="comment_container">
        <div className="title_container">
          <div className="comment_count">{ comments ? comments.length : 0 } 条评论</div>
          {
            user && user.id ?
            (<div className="username">{ user.name }</div>):
            (<div className="login" onClick={ this.loginGithub.bind(this) }>登录</div>)
          }
        </div>
        {
          user && user.id &&
          (
            <div className="create_comment">
              <div className="left">
                <div className="avatar" style={ avatarStyle }></div>
              </div>
              <div className="right">
                <div className="textarea">
                  <textarea ref="textarea" name="textarea" rows="3"></textarea>
                  <div className="submit" onClick={ this.createComment.bind(this) }>发表评论</div>
                </div>
              </div>
            </div>
          )
        }
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
