import React, {useRef, useEffect} from 'react';

const Messages = ({messageList, user, myUsername}) => {

  const endOfMessages = useRef('')
 
  const scrollToEnd = () => endOfMessages.current.scrollIntoView({ behavior: "smooth" })

  const messageItemsJX = messageList.map((message) =>
    message.fromMe ? <li key={message.chatID}>{myUsername}: {message.msg}</li> : <li key={message.chatID}>{user}: {message.msg}</li>
  );

  useEffect(() => scrollToEnd(), [messageList]);

  return (
    <div style={{color: 'rgb(217, 84, 7)', backgroundColor: 'rgb(45, 206, 227)', height:'286px', overflowY: 'scroll'}}>
      <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>{messageItemsJX}</ul>
      <div ref={endOfMessages}></div>
    </div>
  );
}

export default Messages;