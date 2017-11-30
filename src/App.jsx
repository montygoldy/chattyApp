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
      currentUser: {}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: []
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
        </nav>



        <main className="messages">
          <MessageList messages = {this.state.messages}/>
          <Message />
        </main>

        <ChatBar currentUser = {this.state.currentUser} newMessage={this.newMessage}/>


      </div>
    );
  }

  componentDidMount(){
    console.log("componentDidMount <App />");


     this.socket.onopen = (event) => {
      console.log("Connected to server");
      }


      this.socket.onmessage = (event) => {
        console.log("onmessage");
        let data = JSON.parse(event.data).incomingMessage;
        let messages = this.state.messages.concat(data);
        console.log(messages);
        this.setState({messages: messages});
        this.setState({currentUser: {name: data.username}})
      }
    }
}


export default App;








