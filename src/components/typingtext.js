import React from 'react';

const Typing = ({typingList, user}) => {
 
  const typingItems = typingList.map((typing) =>
    <li key={typing.userID}>{user}: {typing.txt}</li>
  );

  return (
    <div className = 'typing-div'>
      <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>{typingItems}</ul>
    </div>
  );
}

export default Typing;