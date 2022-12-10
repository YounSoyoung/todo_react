import React, {useState} from 'react';

//https://mui.com/material-ui/getting-started/learn/
import {ListItem, ListItemText, InputBase, Checkbox} from "@mui/material";


             //매개변수로 props를 넣어 App 컴포넌트에 있는 item 값을 Todo 컴포넌트에서 사용할 수 있다.
             //props 대신 중괄호를 넣으면 props.item이라고 할 필요가 없다.
const Todo = ({ item }) => {

    console.log(item);

    const {id, title, done} = item;

    return (
        <ListItem>
            <Checkbox checked={done} />
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
        </ListItem>
    );
}

export default Todo;