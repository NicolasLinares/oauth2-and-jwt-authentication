


export const getUsers = () => {
    let uri = "/api/users"

    fetch(uri)
        .then(response => {
            return response.json()
        })
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error)
        })
}
