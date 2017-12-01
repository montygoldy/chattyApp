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
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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

      	if(broadcast.type === 'userCount'){
      		let usersOnline = broadcast.usersOnline;
        	this.setState({usersOnline: usersOnline});
      	}

        let messages = this.state.messages.concat(broadcast);
        console.log(messages);
        this.setState({messages: messages});
        this.setState({currentUser: {name: broadcast.username}})

    	}

  }


  newMessage (messageContent) {
    this.socket.send(JSON.stringify(messageContent));
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
          <MessageList messages = {this.state.messages}/>
          <Message />
        </main>

        <ChatBar currentUser = {this.state.currentUser} newMessage={this.newMessage}/>


      </div>
    );
  }


}


export default App;