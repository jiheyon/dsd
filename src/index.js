import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 리액트 라우팅 라이브러리 사용하기 위한 초기작업
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //앱 컴포넌트에서 라우팅을 할 작업을 등록했음, 라우팅용 따로 빼서 컴포넌트 관리하기 
  <BrowserRouter> 
    <AppRouter />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
