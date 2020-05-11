import React from 'react';

const InputBar = ({inputText, setInputText, returnedVal}) => {

  const buttonSubmit = (event) => {
    event.preventDefault();
    returnedVal(inputText);
  };
  
  return (
    <div className = 'input-bar'>
        <form onSubmit={buttonSubmit}>
            <input type='text' value={inputText} autoFocus placeholder="Message" onChange={(event)=>setInputText(event.target.value)}/>
        </form>
    </div>
  );
}

export default InputBar;