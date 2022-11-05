import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteDoneTodo, getAllTodo, toggleModal} from "../../Redux/slicers/todoSlice";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Output = () => {
    const {todos} = useSelector(state => state.todosConfig)
    const dispatch = useDispatch()
    console.log(todos)
    useEffect(() => {
        dispatch(getAllTodo())
    }, [dispatch])
    return (
        <div className='todo__row'>
            {todos && todos.map(el => {
                return (
                    <div key={el._id} className={el.status?'todo__box todo__box-isDone':'todo__box'}>
                        <div className='todo__content'>
                            <p>name: {el.title}</p>
                            <p>description: {el.description}</p>
                        </div>
                        <div className='todo__buttons'>
                            <ClearIcon className='delete__bnt' onClick={() => dispatch(deleteDoneTodo(el._id))}/>
                            <EditIcon
                                className={el.status?'disabled':'edit__bnt'}
                                onClick={el.status?null:()=>dispatch(toggleModal(el._id))}
                            />

                            {el.status?<DoneAllIcon className='done__bnt-activ'/>
                                :<DoneIcon
                                    className='done__bnt '
                                    onClick={() => dispatch(deleteDoneTodo({id:el._id, done:'done'}))}
                                />
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Output;