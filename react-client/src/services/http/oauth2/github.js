import { CONST } from "config"


export const redirectToGithubLogin = () => {
    console.log("Start with GitHub...")
    let timer = null
    const githubLoginURL = CONST.env.API_HOST + "/login/github"
    const newWindow = window.open(githubLoginURL, "_blank")

    newWindow.addEventListener("load", (e) => {
        let { location } = e.target
        let href = location.href
        if (href && href == "http://localhost:3000/login/success") {
            newWindow.close()
        }
    })

    if (newWindow) {
        timer = setInterval(() => {
            if (newWindow.closed) {
                console.log("User close auth window")
                // fetchUser
                if (timer) {
                    clearInterval(timer)
                }
            }
        }, 500)
    }

}
