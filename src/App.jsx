import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.newMessage = this.newMessage.bind(this);

    this.socket = new WebSocket("ws://localhost:3001");

    this.state = {
    	 lastUsername: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [],
       usersOnline: 1
    }
  }


  componentDidMount(){

    this.socket.onopen = () => {
    	console.log("Connected to server");
    }

    this.socket.onmessage = (event) => {

    	// Getting new message from server

    	let broadcast = JSON.parse(event.data);

    	// handle usercout

    	if (broadcast.type === 'userCount') {
        let usersOnline = broadcast.usersOnline;
    		this.setState({usersOnline: usersOnline});
      } else {

      	// handle messages

        const messages = this.state.messages.concat(broadcast);
        this.setState({messages: messages});
      }
  	}
	}


  newMessage (messageContent) {

  	const data = {
  		type: 'postMessage',
  		username: messageContent.username,
  		content: messageContent.content
  	};

    this.socket.send(JSON.stringify(data));

    //COnditions to check if the user name changed

   	if (messageContent.username !== this.state.lastUsername){
    	const content = `${this.state.lastUsername} changed their name to ${messageContent.username}.`;
    	const data = {type: 'postNotification', username: messageContent.username, content: content};
      this.socket.send(JSON.stringify(data));
    }

    this.setState({lastUsername : messageContent.username});
  }

  render() {

    return (
      <div className="wrapper">
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
          <span className = "user_online" >{this.state.usersOnline} <span>users online</span></span>
        </nav>

        <main className="messages">
          <MessageList messages = {this.state.messages} content = {this.state.content}/>
          <Message />
        </main>

        <ChatBar onNewMessage = {this.newMessage} />
      </div>
    );
  }
}


export default App;