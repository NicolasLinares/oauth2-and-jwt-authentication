import { LoginPage, HomePage, SuccessLoginPage } from 'views'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="home" element={<HomePage/>} />
                <Route path="login/success" element={<SuccessLoginPage/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default App
