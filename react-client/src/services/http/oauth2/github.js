import { CONST } from "config"


export const redirectToGithubLogin = () => {
    const githubLoginURL = CONST.env.API_HOST + "/login/github"
    window.location = githubLoginURL
 
    // let timer = null

    // const currentWindow = window.self
    // const authWindow = window.open(githubLoginURL, "_blank")

    // authWindow.addEventListener("load", (e) => {
    //     let { location } = e.target
    //     let href = location.href
    //     if (href && href == "http://localhost:3000/login/success") {
    //         authWindow.close()
    //         currentWindow.location = href
    //     }
    // })

    // if (authWindow) {
    //     timer = setInterval(() => {
    //         if (authWindow.closed) {
    //             console.log("User close auth window")
    //             if (timer) {
    //                 clearInterval(timer)
    //             }
    //         }
    //     }, 500)
    // }

}
