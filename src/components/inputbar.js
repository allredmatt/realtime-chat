import React from 'react';

const InputBar = ({inputText, setInputText, returnedVal}) => {

  const buttonSubmit = (event) => {
    event.preventDefault();
    returnedVal(inputText);
  };
  
  return (
    <div style={{backgroundColor: 'rgb(217, 84, 7)', padding: '10px'}}>
        <form onSubmit={buttonSubmit}>
            <input type='text' value={inputText} placeholder="Message" onChange={(event)=>setInputText(event.target.value)}/>
        </form>
    </div>
  );
}

export default InputBar;