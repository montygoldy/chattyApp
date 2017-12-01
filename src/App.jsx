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
    	 lastUsername: "", // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [],
       usersOnline: 1
    }
  }


  componentDidMount(){
    console.log("componentDidMount <App />");


    this.socket.onopen = () => {
    	console.log("Connected to server");
    }


    this.socket.onmessage = (event) => {
    	let broadcast = JSON.parse(event.data);


    	if(broadcast.type === 'incomingMessage'){
        const messages = this.state.messages.concat(broadcast);
        this.setState({messages: messages});
      } else if(broadcast.type === 'incomingNotification'){
          const content = this.state.messages.concat(broadcast);
          this.setState({messages: content});
      } else if(broadcast.type === 'userCount') {
        let usersOnline = broadcast.usersOnline;
    		this.setState({usersOnline: usersOnline});
      } else {
        throw new Error("Unknown event type " + broadcast.type);
      }
  	}
	}


  newMessage (messageContent) {
  	const data = {type: 'postMessage', username: messageContent.username, content: messageContent.content};
  	console.log(messageContent.username, messageContent, this.state.lastUsername);
    this.socket.send(JSON.stringify(data));

   	if(messageContent.username !== this.state.lastUsername && this.state.lastUsername !== undefined){
     const content = `${this.state.lastUsername} changed their name to ${messageContent.username}.`;
     const data = {type: 'postNotification', username: messageContent.username, content: content};
     this.socket.send(JSON.stringify(data));
    }
    this.setState({lastUsername : messageContent.username});
  }

  render() {
  console.log("Rendering <App/>");
    return (

      <div className="wrapper">
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
          <span>{this.state.usersOnline} users online</span>
        </nav>



        <main className="messages">
          <MessageList messages = {this.state.messages} content = {this.state.content}/>
          <Message />
        </main>

        <ChatBar onNewMessage={this.newMessage}/>


      </div>
    );
  }


}


export default App;