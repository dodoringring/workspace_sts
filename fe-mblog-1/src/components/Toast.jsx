import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setToastFalse } from '../redux/toastStatus/action';
import './toast.css';

const ToastDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 11px;
  min-width: 350px;
  transform: translate(-50%, -50%);
  justify-content: center;
  text-align: center;
  //font-weight: bold;
  font-size: 18px;
  z-index: 99;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  border-radius: 4px;
  border: 1px solid #000000;
`

const Toast = () => {

  const toastStatus = useSelector(state => state.toastStatus);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (toastStatus.status) {
      setTimeout(() => {
        dispatch(setToastFalse()); 
      }, 1500)
    }

  }, [toastStatus.status, dispatch]);
  

  return (
    <ToastDiv>{JSON.stringify(toastStatus.msg)}</ToastDiv>
  );
};

export default Toast;