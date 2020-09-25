import React from 'react';
import 'react-chatbox-component/dist/style.css';
import {ChatBox} from 'react-chatbox-component';
import avatar from './LunaCabeça.png';
import felipe from './Felipe.png';
import CustomTheme from './Palette.js';
import { ThemeProvider } from '@material-ui/core/styles';

class chatBox extends React.Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      allowVerticalScroll: false,
      messages: [],
      user: {},
    };
  }

  componentDidMount() {
    const messages = [
      {
        "text": "Olá, Felipe! Como foi sua semana?",
        "id": "1",
        "sender": {
          "name": "Luna",
          "uid": 2,
          "avatar": avatar,
        },
      },
    ];

    const user = {
      "uid": "user1"
    };


    this.setState({ messages: messages, user: user });

  }


  handleSubmitMessage = async (newMessage) => {
    let user = {'name': "Felipe Augusto", 'uid': this.state.user.uid, "avatar": felipe,}
    await this.submitMessage(newMessage, user)
    await this.getNewMessageFromLuna()
  }

  submitMessage = async (newMessage, sender) => {
    let newMessageObj = {
        'text': newMessage,
        'id': this.state.messages.length+1,
        'sender': sender
    }
    console.log(newMessageObj)
    await this.setState({messages: [...this.state.messages, newMessageObj]})
  }

  getNewMessageFromLuna = async () => {
      let luna = {'name': "Luna", 'uid': 2, "avatar": avatar,}
      this.submitMessage(`teste`, luna)
  }

  render() {
    return (
      <ThemeProvider theme={CustomTheme}>
        <div className='container' style={{paddingTop: '10px', paddingBottom: '10px', maxWidth: "600px",}}>
            <div className='chat-header'>
            <h5 style={{textAlign: `center`}}>Fale com a Luna!</h5>
            </div>
            <ChatBox 
              messages={this.state.messages}
              onSubmit={(newMessage) => this.handleSubmitMessage(newMessage)}
              
            />
        </div>
      </ThemeProvider>
    )
  }
}

export default chatBox;