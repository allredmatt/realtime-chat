import React, {useState} from 'react';

const SingleBox = ({defaultText, returnFunction}) => {
    
    const [textValue, setTextValue] = useState("");

    const buttonSubmit = (event) => {
        event.preventDefault();
        returnFunction(textValue);
        setTextValue ("");
      };

    const handleChange = event => setTextValue(event.target.value)

    return (
        <div style={{backgroundColor: 'rgb(217, 84, 7)', padding: '10px'}}>
            <form onSubmit={buttonSubmit}>
                <input type='text' value={textValue} autoFocus placeholder={defaultText} onChange={handleChange}/>
            </form>
        </div>
    );
}

export default SingleBox;