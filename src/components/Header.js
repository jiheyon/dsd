//헤더는 어딜가든 상단에 따라다님

import React from 'react';
import {AppBar, Toolbar, Grid, Typography, Button} from "@mui/material";
import { Link } from 'react-router-dom';


const Header = () => {


    const USERNAME = localStorage.getItem('LOGIN_USERNAME');

    const logoutHandler = e => {
        //로컬 스토리지 데이터 제거~
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('LOGIN_USERNAME');
        window.location.href='/login';   //내용 지워졌으니 다시 로그인페이지로 보내기
    }

    const button = USERNAME 
        ? (<Button color="inherit" onClick={logoutHandler}>로그아웃</Button>)
        : ( 
            <>
              <Link to='/login' style={{ color: '#fff', marginRight: 20, textDecoration: 'none' }}>로그인</Link>
              <Link to='/join' style={{ color: '#fff', textDecoration: 'none' }}>회원가입</Link>
            </>
        );    
     
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid justify="space-between" container>
                    <Grid item flex={9}>
                        <Typography variant="h6">{USERNAME ? USERNAME : '오늘'}의 할일</Typography>
                        
                    </Grid>
                    <Grid item>
                        {/* <Button color="inherit">
                            {USERNAME ? '로그아웃' : '로그인'}
                        </Button> */}
                        {button}

                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
