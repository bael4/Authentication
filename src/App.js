import React from 'react';
import {Container} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Todo from "./components/Todo/Todo";
import Auth from "./components/Auth/Auth";
import Reg from "./components/Reg/Reg";

import './App.css'
const App = () => {
    return (
        <Container maxWidth="sm">
            <Routes>
                <Route path={'/'} element={<Todo/>}/>
                <Route path={'/auth'} element={<Auth/>}/>
                <Route path={'/reg'} element={<Reg/>}/>
            </Routes>
        </Container>
    );
};

export default App;