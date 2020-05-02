import React from 'react';

const Messages = ({messageList, user, myUsername}) => {
 
  const messageItemsJX = messageList.map((message) =>
    message.fromMe ? <li key={message.chatID}>{myUsername}: {message.msg}</li> : <li key={message.chatID}>{user}: {message.msg}</li>
  );

  return (
    <div style={{color: 'rgb(217, 84, 7)', backgroundColor: 'rgb(45, 206, 227)'}}>
      <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>{messageItemsJX}</ul>
    </div>
  );
}

export default Messages;