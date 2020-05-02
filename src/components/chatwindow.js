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
    <div className='sub-grid' style={{color: 'rgb(45, 206, 227)', backgroundColor: 'rgb(217, 84, 7)'}}>
      <div>Chat with: {toUser}</div>
      <Messages messageList={chatData} user = {toUser} myUsername = {currentUser}/>
      <InputBar inputText={inputText} setInputText={setInputText} returnedVal={returnedVal} />
      <Typing typingList={typingData} user = {toUser}/>
    </div>
  );
}

export default ChatWindow;