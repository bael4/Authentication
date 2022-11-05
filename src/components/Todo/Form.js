import React, {useEffect} from 'react';
import {Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createTodo, handleDescr, handleName} from "../../Redux/slicers/todoSlice";
import {registration} from "../../Redux/slicers/regSlice";

const Form = () => {
    const dispatch = useDispatch()
    const {todo} = useSelector(state => state.todosConfig)
    // console.log(todo)
    const valueName = (e) => {
        dispatch(handleName(e.target.value))
    }
    const valueDescr = (e) => {
        dispatch(handleDescr(e.target.value))
    }

    return (
        <div className='form'>
            <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                autoComplete={'off'}
                fullWidth
                value={todo.title}
                onChange={valueName}
            />
            <TextField
                id="outlined-basic"
                label="decription"
                variant="outlined"
                autoComplete={'off'}
                fullWidth
                value={todo.description}
                onChange={valueDescr}
            />
            <Button
                variant="outlined"
                fullWidth
                onClick={()=>dispatch(createTodo(todo))}
            >Create</Button>
        </div>
    );
};

export default Form;