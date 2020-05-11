import React, {useState, useEffect} from 'react';
import Messages from './messages.js';
import InputBar from './inputbar.js';
import Typing from './typingtext.js';

const ChatWindow = ({currentUser, toUser, chatData, typingData, sendChatData, sendTypingData}) => {

  const [inputText, setInputText] = useState("");
  
  const returnedVal = (inputBarData) =>{
    sendChatData({"fromUsr": currentUser, "toUsr": toUser, "msg": inputBarData});
    setInputText("");
  }

  useEffect( () => {
    sendTypingData({"fromUsr": currentUser, "toUsr": toUser, "txt": inputText});
  }, [inputText, currentUser]);

  return (
    <div className='chat-window' >
      <div>Chatting to {toUser}</div>
      <Messages messageList={chatData} user = {toUser} myUsername = {currentUser}/>
      <InputBar inputText={inputText} setInputText={setInputText} returnedVal={returnedVal} />
      <Typing typingList={typingData} user = {toUser}/>
    </div>
  );
}

export default ChatWindow;