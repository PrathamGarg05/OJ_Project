
function TextInput({placeholder = "enter your text here...",label, type="text", value, onChangeHandler}){
    return(
        <label>
            <span className="block text-sm font-medium text-gray-700"> {label} </span>
            <input
                type={type}
                placeholder={placeholder} 
                value={value}
                onChange={onChangeHandler}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
        </label>
    )
}

export default TextInput;