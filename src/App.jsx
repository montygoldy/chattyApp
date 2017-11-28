import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
       messages: [
      {
        id: "1",
        username: "Bob",
        content: "Has anyone seen my marbles?"
      },
      {
        id: "2",
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }
    ]
  }
}


  render() {
  console.log("Rendering <App/>");
    return (

      <div className="wrapper">
        <nav className="navbar">
          <h1 className="navbar-brand">Chatty</h1>
        </nav>
        <ChatBar currentUser = {this.state.currentUser} />
        <MessageList messages = {this.state.messages}/>

        <main className="messages">
          <Message />
        </main>
      </div>
    );
  }
}
export default App;
