import React, {useEffect} from 'react';
import Form from "./Form";
import Output from "./Output";

import './Todo.css'
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import {getUserName} from "../../Redux/slicers/todoSlice";
import {useNavigate} from "react-router-dom";

const Todo = () => {
    const dispatch = useDispatch()
    const navigete = useNavigate()
    const {modalStatus} = useSelector(state => state.todosConfig.editValues)
    const {username} = useSelector(state => state.todosConfig)
    useEffect(()=>{
        dispatch(getUserName())
        if(!localStorage.getItem(('token'))){
            navigete('/auth')
        }
    },[dispatch, navigete])

    const logOut = () => {
        localStorage.clear()
        navigete('/auth')
    }

    return (
        <div className='todo__main'>
            <div className='header'>
                <h1>Todo List</h1>
                <p>{username}</p>
                <p  className='log-out' onClick={logOut}>log out</p>
            </div>
            <Form/>
            <Output/>
            {modalStatus?<Modal/>:null}
        </div>
    );
};

export default Todo;