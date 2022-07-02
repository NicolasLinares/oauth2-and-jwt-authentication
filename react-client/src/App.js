import { LoginPage, RegisterPage, HomePage, SuccessLoginPage } from 'views'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from "assets/logo.svg"

function Footer() {
    return (
        <footer>
            <small>Powered by ReactJS</small>
            <img src={logo} className="App-logo" alt="logo" />
        </footer>
    )
}

function App() {
    return (
        <div className='App-body'>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<LoginPage/>} />
                    <Route path="login/success" element={<SuccessLoginPage/>} />
                    <Route path="register" element={<RegisterPage/>} />
                    <Route path="home" element={<HomePage/>} />
                </Routes>
            </BrowserRouter>

            <Footer />
        </div>
    )
}

export default App
