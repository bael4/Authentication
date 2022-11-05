import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {ToDoRoute, getAllRoute, deleteRoute, doneRoute, editRoute, NAME_API} from "../../config";

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (todo, {rejectWithValue, dispatch}) => {
        const res = await fetch(ToDoRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(todo),
        })
        const data = await res.json()
        console.log(data)
        dispatch(getAllTodo())
    }
)

export const getAllTodo = createAsyncThunk(
    'todo/getAllTodo',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await fetch(getAllRoute, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStorage.getItem('token')
            },
        })
        const data = await res.json()
        // console.log(data)
        dispatch(getAllTodoReduser(data))
    }
)

export const deleteDoneTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (id, {rejectWithValue, dispatch}) => {
        const res = await fetch(id.done ? doneRoute + id.id : deleteRoute + id, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: id.done ? 'POST' : 'DELETE'
        })
        dispatch(getAllTodo())
    }
)

export const editTodo = createAsyncThunk(
    'todo/editTodo',
    async (data, {rejectWithValue, dispatch}) => {
        const correctData = {
            title: data.title,
            description: data.description,
        }

        const res = await fetch(editRoute + data.id, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'PATCH',
            body: JSON.stringify(correctData),
        })
        dispatch(getAllTodo())
    }
)

export const getUserName = createAsyncThunk(
    'todo/getUserName',
    async (_, {rejectWithValue, dispatch}) => {
        const res = await fetch(NAME_API, {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET',
        })
        const data = await res.json()
        dispatch(getUserNameReduser(data.name))
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        todo: {
            title: '',
            description: '',
        },
        editValues: {
            title: '',
            description: '',
            id: null,
            modalStatus: false,
        },
        username: '',
    },
    reducers: {
        handleName(state, action) {
            state.todo.title = action.payload
        },
        handleDescr(state, action) {
            state.todo.description = action.payload
        },
        getAllTodoReduser(state, action) {
            state.todos = action.payload
            state.todo.title = ''
            state.todo.description = ''
        },
        handleEditTitle(state, action) {
            state.editValues.title = action.payload
        },
        handleEditDescr(state, action) {
            state.editValues.description = action.payload
        },
        toggleModal(state, action) {
            state.editValues.id = action.payload
            state.editValues.modalStatus = !state.editValues.modalStatus
            state.editValues.title = ''
            state.editValues.description = ''
        },
        getUserNameReduser(state, action) {
            state.username = action.payload
        }
    }
})

export const {
    handleName,
    handleDescr,
    getAllTodoReduser,
    handleEditDescr,
    handleEditTitle,
    toggleModal,
    getUserNameReduser
} = todoSlice.actions
export default todoSlice.reducer