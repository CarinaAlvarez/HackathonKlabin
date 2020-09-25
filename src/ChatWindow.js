import React, {Component} from 'react';
import {Launcher} from 'react-chat-window';
import Luna from './LunaCabeça.png';
 
class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      botName: 'Luna',
      userName: 'nome',
    };
  }
 
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: this.state.userName,
          type: 'text',
          data: { text }
        }]
      })
    }
  }
 
  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: this.state.botName,
          imageUrl: Luna
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
      />
    </div>)
  }
}

export default ChatWindow;