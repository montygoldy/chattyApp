import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {

    const message = this.props.messages.map(message => {
      return (<Message
        key = {message.id}
        type = {message.type}
        username = {message.username}
        content = {message.content} />);
    });
   console.log("messagelist", this.props.messages);
    return (
      <div>
        <div>
            {message}
        </div>

        <div className="message system">
           {this.props.content}
        </div>
      </div>
    );
  }
}
export default MessageList;