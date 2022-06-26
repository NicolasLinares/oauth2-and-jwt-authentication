import { FcGoogle } from 'react-icons/fc'
import BasicButton from "./common"

function GoogleOAuth2Button ({onClick}) {
    return (
        <BasicButton
            IconElement={() => <FcGoogle className="mx-2" />}
            text={"Continue with Google"}
            className={"btn-light"}
            onClick={onClick}
        />
    )
}

function GitHubOAuth2Button ({onClick}) {
    return (
        <BasicButton
            IconElement={() => <i className="bi bi-github mx-2"></i>}
            text={"Continue with GitHub"}
            className={"btn-dark"}
            onClick={onClick}
        />
    )
}

function LoginButton ({onClick}) {
    return (
        <BasicButton
            type="submit"
            text={"Continue with email"}
            className={"btn-light"}
            onClick={onClick}
        />
    )
}

export {
    LoginButton,
    GoogleOAuth2Button,
    GitHubOAuth2Button
}