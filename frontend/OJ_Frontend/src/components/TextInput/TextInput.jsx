
function TextInput({placeholder = "enter your text here...",label, type="text", value, onChangeHandler}){
    return(
        <label>
            <span> {label} </span>
            <input
                type={type}
                placeholder={placeholder} 
                value={value}
                onChange={onChangeHandler}
            />
        </label>
    )
}

export default TextInput;