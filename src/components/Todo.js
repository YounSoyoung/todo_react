import React, {useEffect, useState} from 'react';

//https://mui.com/material-ui/getting-started/learn/
import {ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton} from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import { BASE_URL } from '../App';


             //매개변수로 props를 넣어 App 컴포넌트에 있는 item 값을 Todo 컴포넌트에서 사용할 수 있다.
             //props 대신 중괄호를 넣으면 props.item이라고 할 필요가 없다. 중괄호 안에는 변수명이 들어간다.({a, b})
const Todo = ({ item, remove, update }) => {

    // console.log(item);

    const [itemState, setItemState] = useState(item);

    const {id, title, done} = itemState;

    //삭제 이벤트 핸들러
    const removeHandler = e => {
        // console.log(item);
        remove(item);
    };

    

    //체크박스 체인지 이벤트 핸들러
    const checkHandler = e => {
        console.log('체크박스 버튼 누름');
        setItemState({...itemState, done: !itemState.done}); //: ...itemState기존의 값은 그대로 넣어라, done만 반대로 바꿔주기
        
    };

    useEffect(() => {
        // update(itemState);
    }, [itemState])

    return (
        <ListItem>
            <Checkbox checked={done} onChange={checkHandler}/>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label" : "naked"}}
                    type="text"
                    id={id}
                    name={id}
                    value={title}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            {/* 삭제 버튼 */}
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={removeHandler}>
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;