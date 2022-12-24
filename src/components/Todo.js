import React, { useEffect, useState } from 'react';

//https://mui.com/material-ui/getting-started/learn/
import {ListItem, ListItemText, 
    InputBase, Checkbox, 
    ListItemSecondaryAction, IconButton} from "@mui/material";
import { DeleteOutline } from '@mui/icons-material';
import { BASE_URL } from '../App';

const Todo = ({ item, remove, update }) => {

    const [itemState, setItemState] = useState(item);
    // console.log(item);

    const {id, title, done} = itemState;



    // 삭제 이벤트 핸들러
    const removeHandler = e => {
      console.log(item);  
      remove(item);  // 삭제버튼을 누르면 앱.js에 있는 리무브가 콜됨
    };



        // 체크박스 체인지 이벤트 핸들러
        const checkHandler = e => {
            console.log('체크박스 버튼 누름');
            setItemState({...itemState, done: !itemState.done});
              // ... => 기본 값은 그대로 두고 :만 바꿔라
            // itemState전체를 바꾼거임
            // 서버에 PUT요청 보내서 처리하기까지 진행
            
            // 위에 상태 불러오기
        };
        useEffect(() => {
            update(itemState);
        }, [itemState])

        

    return (
        <ListItem>
            {/* onchange 이벤트 걸려야되고 반대로 바꾸라고 하면됨
            서버에게 put 수정으로 요청하고 ur/todos/3 논리값 바꿔라 등등 처리 */}
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
                <IconButton 
                aria-label="Delete Todo"
                onClick={removeHandler}
                 >
                    <DeleteOutline/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;