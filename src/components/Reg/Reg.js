import React, {useCallback, useEffect} from 'react';
import {Button, CircularProgress, TextField} from "@mui/material";
import Password from "./Password";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'

import {handleName, handlePass, handleEmail, registration, handleToggle} from "../../Redux/slicers/regSlice";

import './Reg.css'

const Reg = ({auth}) => {
    const {status, listErrors} = useSelector(state => state.reg)
    const {reg} = useSelector(state => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendToMain = useCallback(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        sendToMain()
    }, [sendToMain])

    const finalApprove = async () => {
        const authData = {...reg.login}
        delete authData.name
        if(auth){
            await dispatch(registration({authData,key:'auth'}))
        }else{
            await dispatch(registration(reg.login))
        }
        await sendToMain()
    }

    // console.log(reg.login)
    const navigateMain = () => {
        if(auth){
            navigate('/reg')
        }else{
            navigate('/auth')
        }
        dispatch(handleName(''))
        dispatch(handlePass(''))
        dispatch(handleEmail(''))
        dispatch(handleToggle())
    }

    const valueName = (e) => {
        dispatch(handleName(e.target.value))
    }
    const valueEmail = (e) => {
        dispatch(handleEmail(e.target.value))
    }
    const valuePass = (e) => {
        dispatch(handlePass(e.target.value))
    }
    return (
        <div className='reg'>
         <p>Use this password to register <span style={{color:'red'}}> Qwerty1! </span></p>
            {auth?<h2>authorization</h2>:<h2>Registration</h2>}
            {auth?null:<TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                autoComplete={'off'}
                value={reg.login.name}
                onChange={valueName}
            />}

            <div className='textFildBox'>
                {listErrors && listErrors.map((el, index)=>{
                    return (
                        el.param==='email'?<p key={index}>{el.msg}</p>:null
                    )
                })}
                {status==='rejected'&&<p>не корректный email</p>}
                <TextField
                    id="outlined-basic"
                    label="email"
                    variant="outlined"
                    autoComplete={'off'}
                    value={reg.login.email}
                    onChange={valueEmail}
                    fullWidth
                />
            </div>
            <div className='textFildBox'>
                {listErrors && listErrors.map((el, index)=>{
                    return (
                        el.param==='pass'?<p key={index}>{el.msg}</p>:null
                    )
                })}
                <Password
                    valuePass={valuePass}
                    pasValue={reg.login.pass}
                />
            </div>
            <Button
                variant="contained"
                onClick={finalApprove}
                disabled={status === 'loading'}
                style={{display: 'flex'}}
            >{auth?'log in':'registration'}{status === 'loading' &&
                <CircularProgress color="inherit" style={{width: '20px', height: '20px'}}/>}
            </Button>
            <Button variant="outlined" fullWidth onClick={navigateMain}>{auth?'to reg':'to auth'}</Button>
        </div>
    );
};

export default Reg;