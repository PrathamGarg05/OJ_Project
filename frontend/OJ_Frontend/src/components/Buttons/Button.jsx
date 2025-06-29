import getButtonStyle from "./buttonStyle.js";

function Button({text, type="button", styleType="primary",style, onClickHandler}){
    return(
        <button
            type={type}
            onClick={onClickHandler}
            className={`${style} ${getButtonStyle(styleType)}`}
        >
            {text}
        </button>
    )
}

export default Button;