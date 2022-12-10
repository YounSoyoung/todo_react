import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';
import {List} from '@mui/material'
import TodoList from '../../ajax-basic/src/TodoList';

//화면에 렌더링할 할 일 데이터
const items = [
  {
      id: 1,
      title: '점심 메뉴 고르기',
      done: true
  },
  {
      id: 2,
      title: '책 읽기',
      done: false
  },
  {
    id: 3,
    title: '동영상 강의 보기',
    done: false
  }
];

const todoItems = items.map(item => {
  return <Todo key={item.id} item={item}/>;
});

const App = () => {
  return (
    <div className="App">
      <List>
        {todoItems}
      </List>
    </div>
  );
}

export default App;
