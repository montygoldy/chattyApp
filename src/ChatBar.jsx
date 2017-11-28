import React, {Component} from 'react';

class ChatBar extends Component {

	render() {
	console.log("Rendering <ChatBar/>");
		return (
			<nav className="navbar">
				<h1 className="navbar-brand">Chatty</h1>
				<span className="user">{this.props.currentUser}</span>
			</nav>
		);
	}
}
export default ChatBar;