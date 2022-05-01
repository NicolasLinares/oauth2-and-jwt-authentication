export const startWithGoogle = () => {
    fetch('http://localhost:3080/api/users')
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
        }).catch(error => {
            console.error(error)
        })
}