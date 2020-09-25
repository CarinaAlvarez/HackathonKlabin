import React, {Component} from 'react';
import {Launcher} from 'react-chat-window';
import Luna from './LunaCabeça.png';
import CONST from './CONST'
 
class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      userName: 'Felipe',
      messagesLuna: ["Oi! Como está sendo sua semana na Klabin?", 
                    "Como tem se sentido na sua relação com seu time?",
                    "Você está se sente confortável em seu ambiente de trabalho?",
                    "O que acha que poderia melhorar seus dias na Klabin?",
                    "Obrigada por me fazer essa visita! Sempre que quiser pode vir falar comigo :)"
                    ],
      i: 0,
    };
  }
  
  componentDidMount() {
    this._sendMessage(this.state.messagesLuna[this.state.i]);
    this.setState({i: this.state.i+1})
  }

  postNewFeedback = async (feedback) => {
    try {
      let data = {
        employeeId: 1,
        officeLocation: "São Paulo",
        teamName: "RH",
        feedbackText: feedback
      }

      let response = await fetch(`${CONST.apiBaseURL}feedback/`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      let responseJson = await response.json();
      console.log(responseJson);
    }
    catch (err) {
      console.log(err)
    }
  }

  _onMessageWasSent(message) {
    this.postNewFeedback(message.data.text)
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }
 
  async _sendMessage(text) {
    if (text.length > 0) {
      await this.setState({
        messageList: [...this.state.messageList, {
          author: 'Luna',
          type: 'text',
          data: { text }
        }]
      })
    }
    return
  }

  async handleSubmitMessage(message) {
    await this._onMessageWasSent(message)
    if (this.state.i<5) {
      await setTimeout(()=>{return},1000)
      await this._sendMessage(this.state.messagesLuna[this.state.i]);
      this.setState({i: this.state.i+1})
    } 
  }

  handleFiles = () => {
    this._sendMessage("Seu arquivo foi recebido com sucesso1");
  }
 
  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Luna',
          imageUrl: Luna
        }}
        onFilesSelected = {() => this.handleFiles()}
        showEmoji = {false}
        onMessageWasSent={this.handleSubmitMessage.bind(this)}
        messageList={this.state.messageList}
      />
    </div>)
  }
}



export default ChatWindow;