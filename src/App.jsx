import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      currentUser: {}
    }
  }


  render() {
  console.log("Rendering <App/>");
    return (

      <div className="wrapper">
        <ChatBar user = {this.state.currentUser} />
        <MessageList />
        <Message />
      </div>
    );
  }
}
export default App;
