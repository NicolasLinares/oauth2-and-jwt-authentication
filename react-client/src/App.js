import { LoginPage, HomePage } from 'views'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="home" element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
