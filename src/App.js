import React, {useState} from 'react';
import './css/main.css';
import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import {List} from '@mui/material';
import AddTodo from './components/AddTodo';


const App = () => {

  const [itemList, setItemList] = useState(//[
  //   {
  //       id: 1,
  //       title: '점심 메뉴 고르기',
  //       done: true
  //   },
  //   {
  //       id: 2,
  //       title: '책 읽기',
  //       done: false
  //   },
  //   {
  //     id: 3,
  //     title: '동영상 강의 보기',
  //     done: false
  //   }
  // ]
  );

  
  //AddTodo에게 전달할 함수
  //할 일 추가 처리 함수
  const add = (item) => {
    item.id = itemList.length + 1;
    item.done = false;
    
    // console.log('add 호출됨!');
    // console.log(item);
    
    setItemList(itemList => itemList.concat(item));
  };
  
  //Todo에게 보낼 삭제 함수
  //target: 내가 삭제할 객체, item: 배열에 저장된 객체
  const remove = target => {
    console.log('remove call!!');

    const filteredItemList = itemList.filter(item => target.id !== item.id); //아이디가 같을 경우 배열에 저장되지 않으므로 삭제된다.

    setItemList(filteredItemList);
  };
  
  const todoItems = itemList.map(item => <Todo key={item.id} item={item} remove={remove}/>);


//   useEffect(() => {
//     // console.log('재 렌더링!!');
//     // console.log(itemList);
// }, [itemList]);

  return (
    <div className="wrapper">
      <AddTodo add={add} />
      <List>
          {todoItems}
      </List>
    </div>
  );
};


export default App;
