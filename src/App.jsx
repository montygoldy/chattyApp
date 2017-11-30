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
       messages: []
    }
  }


  newMessage (messageContent) {
    let id = this.state.messages.length + 1;
    let username = this.state.currentUser.name;
    let content = messageContent;
    let newMessageObject = {

      username: username,
      content: content
    };
    console.log(newMessageObject);
    this.socket.send(JSON.stringify(newMessageObject));

  }


 //  this.socket.onmessage = (event) => {
 //    console.log(event);
 //  }


 //  this.socket.onmessage = (event) => {
 // +      console.log('in onmessage');
 // +      let data = JSON.parse(event.data).data;
 // +      let messages =this.state.messages.concat(data);
 // +      console.log("========", this.state.messages, messages);
 // +      this.setState({messages: messages});
 // +      this.setState({currentUser: {name: data.username}});

 // +    }
 // +  }


  render() {
  console.log("Rendering <App/>");
    return (

      <div className="wrapper">
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
        </nav>
        <ChatBar currentUser = {this.state.currentUser} changeHandler={this.newMessage} socket={this.socket}/>
        <MessageList messages = {this.state.messages}/>

        <main className="messages">
          <Message />
        </main>
      </div>
    );
  }

  componentDidMount(){
    console.log("componentDidMount <App />");


     this.socket.onopen = (event) => {
      console.log("Connected to server");


    }
  }
}
export default App;











