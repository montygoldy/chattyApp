import React, {Component} from 'react';

class Message extends Component {
  render() {
  if (this.props.type === "incomingMessage") {

    return (
      <div className="message">
        <div className="message_content">
          <span className="message-username" style={{color: this.props.color}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </div>
    );

  } else{
      return (
        <div className="message system">
          <div className="notification">
            {this.props.content}
          </div>
        </div>
      )
    }
  }
}
export default Message;