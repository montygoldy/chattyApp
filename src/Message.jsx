import React, {Component} from 'react';

class Message extends Component {
  render() {
  console.log("Rendering <Message />");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="text" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Message;