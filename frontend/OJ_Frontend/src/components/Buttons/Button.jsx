import getButtonStyle from "./buttonStyle.js";

function Button({text, type="button", styleType="primary", onClickHandler}){
    return(
        <button
            type={type}
            onClick={onClickHandler}
            className={` w-full text-gray py-2 rounded-lg ${getButtonStyle(styleType)}`}
        >
            {text}
        </button>
    )
}

export default Button;