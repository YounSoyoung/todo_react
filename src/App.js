import React, {useState, useEffect} from 'react';
import './css/main.css';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import {List, Paper} from '@mui/material';
import AddTodo from './components/AddTodo';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Spinner} from 'reactstrap';


import { API_BASE_URL } from './config/host-config';

export const BASE_URL = API_BASE_URL + '/api/todos'; //export를 달아 URL을 밖에서도 사용할 수 있도록 한다.


const App = () => {
  // 토큰 가져오기
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

  const [loading, setLoading] = useState(true); //처음에는 로딩 중이므로 true가 된다. 로딩이 끝나고 나면(할일 목록을 모두 불러오면) false가 되어야한다
  const [itemList, setItemList] = useState([]);

  
  //AddTodo에게 전달할 함수
  //할 일 추가 처리 함수
  const add = (item) => {
    fetch(BASE_URL, {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then(json => {
      // console.log(json);
      setItemList(json.todos);
    })
    
    // console.log('add 호출됨!');
    // console.log(item);
    
    setItemList(itemList => itemList.concat(item));
  };
  
  //Todo에게 보낼 삭제 함수
  //target: 내가 삭제할 객체, item: 배열에 저장된 객체
  const remove = target => {
    // console.log(target);
    fetch(BASE_URL + `/${target.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      }
    })
    .then(res => res.json())
    .then(json => {
      setItemList(json.todos);
    });
  };

  //서버에 수정요청하는 함수
  const update = (item) => {
    fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + ACCESS_TOKEN
        },
        body: JSON.stringify(item)
    });
};
  
  const todoItems = itemList.map(item => <Todo key={item.id} item={item} remove={remove} update={update}/>); //만약 a={item}, b={remove}일 경우 Todo(Todo.js)의 매개변수는 a, b가 된다.


  useEffect(() => {
    //할일 목록 불러오기
    fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      }
    })
    .then(res => {
      if (res.status === 403) {
        setTimeout(()=>{
            
          alert('로그인이 필요한 서비스입니다.');
          window.location.href='/login';
        }, 1000)
         return;
      } else {
         return res.json();
      }
    })
    .then(json => {
        // console.log(json.todos);
        setItemList(json.todos);
        //로딩 끝
        setLoading(false);
    });

}, [ACCESS_TOKEN]);


// 로딩 중일 때 보여줄 화면
const loadingPage = (
  <div style={{
    width: 'fit-content',
    margin: '50 auto'
  }}>
    <Spinner color="secondary">
    Loading...
    </Spinner>
  </div>
  
);

// 로딩이 끝났을 때 보여줄 화면
const viewPage = (
  <Container maxWidth="md" style={{marginTop: 100}}>
    <AddTodo add={add} />
    <Paper style={{margin: 16}}>
      <List>
          {todoItems}
      </List>
    </Paper>
  </Container>
);

  

  return (
    <div className="wrapper">
      {loading ? loadingPage : viewPage}
    </div>
  );
};


export default App;
