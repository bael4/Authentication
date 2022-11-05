import React from 'react';
import {Button, Container, TextField} from "@mui/material";
import {editTodo, handleEditDescr, handleEditTitle, toggleModal} from "../../Redux/slicers/todoSlice";
import {useDispatch, useSelector} from "react-redux";

const Modal = () => {
    const dispatch = useDispatch()
    const {editValues} = useSelector(state => state.todosConfig)
    console.log(editValues)
    const editTitle = (e) => {
        dispatch(handleEditTitle(e.target.value))
    }
    const editDescr = (e) => {
        dispatch(handleEditDescr(e.target.value))
    }


    const editToggleFunc = () => {
        dispatch(toggleModal(''))
        dispatch(editTodo({id:editValues.id,title:editValues.title, description:editValues.description}))
    }

    return (
        <div className='modal__form'>
            <Container maxWidth="sm" className='form__box'>
                <h2>edit todo</h2>
                    <TextField
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        autoComplete={'off'}
                        fullWidth
                        value={editValues.title}
                        onChange={editTitle}
                    />
                    <TextField
                        id="outlined-basic"
                        label="decription"
                        variant="outlined"
                        autoComplete={'off'}
                        fullWidth
                        value={editValues.description}
                        onChange={editDescr}
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={editToggleFunc}
                    >edit</Button>
            </Container>
        </div>
    );
};

export default Modal;