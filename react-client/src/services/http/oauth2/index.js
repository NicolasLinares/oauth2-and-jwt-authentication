

export const startWith = (providerUrl, callback) => {

    let timer = null
    const authWindow = window.open(providerUrl, "_blank", "width: 500px; height: 600px")

    timer = setInterval(() => {

        if (authWindow && authWindow.closed) {
            callback()
            timer && clearInterval(timer)
        }
    }, 500)
}


