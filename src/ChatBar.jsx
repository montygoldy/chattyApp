import React, {Component} from 'react';

class ChatBar extends Component {

	constructor(props){
		super(props)
		this.state = {content: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
   	this.setState({content: event.target.value});
	}

  handleSubmit(event){
  	if(event.key === "Enter"){
  		this.props.changeHandler(this.state.content);
 			event.target.value ="";
  	}
  }

	render() {
	console.log("Rendering <ChatBar/>");
	const content = this.state.value;
		return (
			<footer className="chatbar">
        <input className="chatbar-username" type="text" defaultValue={this.props.currentUser.name} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" onChange={this.handleChange} onKeyDown={this.handleSubmit}/>
      </footer>

		);
	}
}
export default ChatBar;