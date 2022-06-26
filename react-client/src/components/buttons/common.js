import { BootstrapStyle } from "assets/bootstrapStyle"

function BasicButton({IconElement, type, text, className, onClick}) {

    const doOnClick = (e) => {
        if (!onClick || typeof(onClick) !== "function") {
            console.warn("OnClick not implemented")
            return
        }
        onClick(e)
    }

    return (
        <button
            type={type || "button"}
            className={`${BootstrapStyle.button} ${className}`} 
            onClick={doOnClick}
        >
            {IconElement && <IconElement />}
            <span>
                {text}
            </span>
        </button>
    )
}

export default BasicButton