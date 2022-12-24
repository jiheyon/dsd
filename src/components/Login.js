import React from "react";
import {Grid, Button, Container, Typography, TextField} from "@mui/material";
import { API_BASE_URL } from "../config/host-config";
import { PostAdd } from "@mui/icons-material";

const Login = () => {

    //  로그인 서브밋 이벤트 핸들러

    const submitHandler = e => {

        // html 태그가 가진 기본 기능을 먼저 없애기
        e.preventDefault();  // a태그랑, form 태그에 이벤트 걸 때 그냥 넣고 시작하기!

        // 1. 이메일 입력란, 패스워드 입력란에 있는 데이터를 얻어온다.
        // 이메일 입력값을 가져온다
        const $email = document.getElementById('email');
        // console.log($email.value);

        // 패스워드 입력값
        const $password = document.getElementById('password');
        console.log($password.value);
        // ㄴ>userController로 보내서 로그인 처리하기(post / signin)

        // 서버에 로그인 요청
        fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email : $email.value,
                password: $password.value

            })
        })
        .then(res => {
            console.log('res code:', res.status);
            return res.json();
        })
        .then(loginUserData => {
            // console.log(loginUserData);
            if (loginUserData.message) {
                console.log('로그인 실패');
                alert(loginUserData.message);
            } else {
                // console.log('로그인 성공');

                // 로그인 성공시 받은 토큰을 로컷 스토리지에 저장
                localStorage.setItem('ACCESS_TOKEN', loginUserData.token); //로컬스토리지에 키,벨류 저장하기 
                localStorage.setItem('LOGIN_USERNAME', loginUserData.username);
                // 로그인 성공시 할일 목록 보여주기
                // '/'로 이동해야됨 ㄱ
                window.location.href = '/';

            }

        })
        // then은 성공했을 때 실행, catch는 실패했을때 실행
        // 서버가 200번이 아닌 오류코드를 보낼 경우 실행할 코드임
        .catch(err => {
            console.log('err: ', err.message);
        })
    };




    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "200px" }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    로그인
                </Typography>
            </Grid>
        </Grid>
        <form noValidate onSubmit={submitHandler}>
            {" "}
            {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* 텍스트 인풋임*/ }
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password" 
                        label="패스워드"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        로그인
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>

    );
};

export default Login;




// 로그인에 실패할 경우 - 실패 에러 메세지를 보여줌
// 로그인에 성공할 경우 - 해당 회원의 할일 목록을 띄워줌
// ㄴ> 토큰과 함께 api/새앤 GET요청을 해야함
// ㄴ> 코튼을 받아와서 어딘가에 저장해놓고 요청할 때마다 헤더에 토큰을 실어줘야 함.
// ㄴ> 그럼 토큰을 "어디에"저장할건가?// 버튼을 눌렀을 때! 
// 폼이 서브밋 될 때 처리해라 = onSubmit