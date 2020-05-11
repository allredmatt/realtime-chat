import React, { useState, useEffect } from 'react';
import openSocket from 'socket.io-client';
import ChatWindow from './components/chatwindow.js';
import SingleBox from './components/singlebox.js';
import AddNewChat from './components/newchat.js' 

const socket = openSocket('http://localhost:4001');
socket.open();

function App() {
    const [chatList, setChatList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [typingList, setTypingList] = useState([]);
    const [myUserName, setMyUserName] = useState("Guest")

    const sendChatData = (data) => {
      socket.emit('chat', data);
      let chatMessageTo = userList.find((user) => user.name === data.toUsr).userID; //Find userID for this user
      let newChatList = {
        chatID: chatList.length + 1,
        userID: chatMessageTo,
        msg: data.msg,
        fromMe : true //To display from me in messages.js
      };
      setChatList(chatList.concat(newChatList));
    }
    const sendTypingData = (data) => socket.emit('type', data);

  useEffect(()=>{
    const newMessageData = ({toUsr, fromUsr, msg}) => {
      //what to do with new chat info from server.
      if(!userList.find((user) => user.name === fromUsr)){
        addUser(fromUsr);
      };
      let chatMessageFrom = userList.find((user) => user.name === fromUsr).userID; //ID of user that send chat message
      let newChatList = {
        chatID: chatList.length + 1,
        userID: chatMessageFrom,
        msg: msg
      };
      setChatList(chatList.concat(newChatList));
    };
      socket.on('chat', (data) => newMessageData(data));
    return () => {
      socket.off('chat');
    }
  }, [myUserName, chatList, userList]);
  
  useEffect(()=>{
    const newTypingData = ({toUsr, fromUsr, txt}) => {
      //what to do with new typing data from server.
      if(!userList.find((user) => user.name === fromUsr)){
        let newUserID = addUser(fromUsr) //if name not in user list then append to end of user list
        setTypingList(typingList.concat({userID: newUserID, txt: txt}));
      } else {
        let typingMessageFrom = userList.find((user) => user.name === fromUsr).userID;
        setTypingList(typingList.filter((user) => user.userID !== typingMessageFrom).concat({userID: typingMessageFrom, txt: txt}));
      };
    };
    socket.on('type', (data) => newTypingData(data));
    return () => {
      socket.off('type');
    };
  }, [myUserName, userList, typingList]);

  const chatroomName = (user1, user2) => {
    let roomName = ""
    if(user1 < user2){
      roomName = `${user1}&${user2}`
    } else {
      roomName = `${user2}&${user1}`
    };
    return(roomName);
  }

  useEffect(()=> {
    userList.forEach((user) => {
      socket.emit("subscribe", { room: chatroomName(user.name, myUserName) });;
      }
    )
  }, [myUserName, userList]);

  useEffect(()=>{
    socket.on('invite', (data) => {
      if (data.invite === myUserName){
      if(window.confirm(`${data.from} would like to chat with you.`)) {addUser(data.from)};
    }})
    return () => {
      socket.off('invite');
    };
  }, [myUserName, userList]);

  const addUser = (usrName) => {
    let newUserID = `user${userList.length + 1}`;
    setUserList(userList.concat({userID: newUserID, name: usrName}))
    return (newUserID)
  }

  const inviteUser = (usrName) => {
    addUser(usrName);
    socket.emit('invite', {invite: usrName, from: myUserName});
  }

  const chatWindowsJX = userList.map((user) => {
    if(user.name !== myUserName){
      return(
        <ChatWindow key = {user.userID} currentUser = {myUserName} toUser = {user.name} 
          chatData = {chatList.filter((chatUser) => chatUser.userID === user.userID)} 
          typingData = {typingList.filter((typingUser) => typingUser.userID === user.userID)} 
          sendChatData = {sendChatData} sendTypingData = {sendTypingData}/>
      )
    }
    }
  );

  return (
    <>
      {myUserName === "Guest" ? <SingleBox defaultText = {"Please enter username"} returnFunction = {setMyUserName}/> : chatWindowsJX}
      <AddNewChat newUser = {inviteUser} />
    </>
  )
};
export default App;
