import getButtonStyle from "./button";

function Button({text, type="button", styleType="primary", onClickHandler}){
    return(
        <button
            type={type}
            onClick={onClickHandler}
            className={`${getButtonStyle(styleType)}`}
        >
            {text}
        </button>
    )
}

export default Button;