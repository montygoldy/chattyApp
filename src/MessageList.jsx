import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {

  render() {

    const message = this.props.messages.map(message => {
      return (<Message
        key={message.id}
        username = {message.username}
        content = {message.content} />);
    });

    return (
      <div>
        <div>
            {message}
        </div>

        <div className="message system">
            Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default MessageList;