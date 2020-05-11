import React, {useState, useEffect, useRef} from 'react';

const AddNewChat = ({newUser}) => {

    const [textValue, setTextValue] = useState("");
    const [tickPressed, setTickPressed] = useState(false);

    const formRef = useRef('')

    const formSubmit = (event) => {
        event.preventDefault();
        newUser(textValue);
        setTextValue ("");
        setTickPressed(false);
    };

    const handleChange = event => setTextValue(event.target.value)
    
    const buttonClick = () => {
        setTickPressed(!tickPressed);
        //formRef.current.focus();
    }

    //useEffect(() =>{
    //    if(tickPressed){formRef.current.focus()}
    //}, [tickPressed])

    return (
        <div className = 'new-chat'>
            {tickPressed ? (
                    <form ref = {formRef} onSubmit={formSubmit}>
                        <input type='text' value={textValue} autoFocus placeholder="Who to invite to chat?" onChange={handleChange}/>
                    </form>
                ) : (
                    <button type="button" onClick={buttonClick}>+</button>
                )}
        </div>
    )
}

export default AddNewChat;