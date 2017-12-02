import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props){
    super(props)
    this.state = {content: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handling the user input

  handleChange(event) {
    let id = event.target.id;  // assigning id to the input id
    let value = event.target.value;

    if(id === "new_message"){
      this.setState({content: value});
    }

    if(id === "username"){
      this.setState({username: value });
    }
  }

  // handling the submit of the input

  handleSubmit(event){
    let id = event.target.id;
    let value = event.target.value;
    let contentObj = {
      username: this.state.username || "Anonymous",
      content: this.state.content
    }



    // Grabbing the enter key on message input

    if(event.key === "Enter" && value !== ""){
      if(id === "new_message"){
        this.props.onNewMessage(contentObj);
        event.target.value ="";
      }
    }
  }

  render() {
  console.log("Rendering <ChatBar/>");
  const content = this.state.value;
    return (
      <footer className="chatbar">
        <input
          id= "username"
          className="chatbar-username"
          type="text"
          value={this.props.username}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          placeholder="Name (optional)"
        />
        <input
          id= "new_message"
          className="chatbar-message"
          type="text"
          placeholder="Enter your message and hit ENTER"
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </footer>

    );
  }
}
export default ChatBar;