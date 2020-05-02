import React from 'react';

const Typing = ({typingList, user}) => {
 
  const typingItems = typingList.map((typing) =>
    <li key={typing.userID}>{user}: {typing.txt}</li>
  );

  return (
    <div style={{color: 'rgb(45, 206, 227)', backgroundColor: 'rgb(217, 84, 7)'}}>
      <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>{typingItems}</ul>
    </div>
  );
}

export default Typing;