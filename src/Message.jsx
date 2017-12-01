import React, {Component} from 'react';

class Message extends Component {
  render() {
  console.log("Rendering <Message />");
    let username = this.props.username;
    return (

        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>

    );
  }
}
export default Message;