import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

// 将local中的user保存到内存中去
const user = storageUtils.getUser();
memoryUtils.user = user;
ReactDOM.render(<App/>,document.querySelector('#root'));