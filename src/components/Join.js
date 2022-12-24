import React, { useState } from "react";
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";

import { API_BASE_URL } from "../config/host-config";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";

const Join = () => {
        // 회원 입력정보를 모두 읽어서 서버에 요청을 보내기

        // fetch(API_BASE_URL+'/auth/signup',{ // 스펙은 userDTO 형식에 맞춰서 진행
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         username: '짹짹이',
        //         email: 'zzz@hhh.com',
        //         password: '1234'
        //     })
        // })   
        // a** 보내지긴 하는데 값 입력아뇐, 그리고 상태관리로 검증도 해야됨
        
  
    
   const [user, setUser] = useState({   
     // 회원 입력 정보 상태관리 , 입력을 시작하면 ''에 들어갈거임, 대신 검사하고!
        username: '',
        email: '',
        password: ''
    });

    // 검증 메세지 상태관리
    const [msg, setMsg] = useState({  // 3개라서 객체로 상태관리
        username: '',
        email: '',
        password: ''
    });
    
    // 검증 완료 여주 상태관리 (3개 다 ok)
    const [validate, setValidate] = useState ({
        username: false,
        email: false,
        password: false
    });


    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    // 회원 이름을 입력처리 하는 이벤트 핸들러
    const nameHandler = e => {   // 이 핸들러는 유저네임에 이름을 입력하는 순간 작동됨!
        // console.log(e.target.value);
        const nameRegex = /^[가-힣]{2,8}$/;  // 한글의 모든 정규 {,} -> 글자수

        // 이름이 정확히 쓰여진 이름인가? - 검증하기!
        let massage; //  하단에 입력 상황 메세지 띄우기
        if (!e.target.value) {      // 유저네임을 안적음
            massage = '유저이름은 필수값입니다.';
            setValidate({...validate, username: false})

        } else if (!nameRegex.test(e.target.value)) {  // 이름은 2~8글자 사이의 한글로만
            //이런걸 처리할 때 정규표현식임-> 저음엔 검색해서 쓰기 (회원가입 정규표현식)
            // 정규표현식에 맞으면 true 틀리면 false로 나옴    
            massage = '2글자에서 8글자 사이의 한글로 입력해주세요.';
            setValidate({...validate, username: false})
        } else {
            massage = '사용 가능한 이름입니다';
            setValidate({...validate, username: true})
       }
    setMsg({...msg, username:massage}); // 기존 메세지는 두고 변경된 메세지만 띄워주기

    setUser({ ...user, username: e.target.value }) // ...user : 기존값을 다 복사해서 넣어라!=유저네임만 현재값으로 바뀜
    }; 



    // 패스워드 입력값 검증
    const passwordHandler = (e) => {

        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidate({...validate, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 영문, 특수문자, 숫자를 포함해주세요!';
            setValidate({...validate, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidate({...validate, password: true});
        }
        setMsg({...msg, password: message});

        setUser({...user, password: e.target.value})

    };


    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    // 이메일 중복확인 서버통신
    
   

 
    const checkEmail = (email) => { // =GET매핑 "/check?"로 보내서 boolean값으로 중복여부 알려줌

        fetch(`${API_BASE_URL}/auth/check?email=${email}`)   // 위 이메일 변수가 들어옴, 그건 checkEmail(e.target.value); 여기서 보낸거
            .then(res => res.json())
            .then(flag => {
                let message;
                if (flag) {
                    message = '중복된 이메일입니다.';
                    setValidate({...validate, email: false});
                } else {
                    message = '사용가능한 이메일입니다.';
                    setValidate({...validate, email: true});
                }
                setMsg({...msg, email: message});
            });
    };

    // 이메일 입력 검증
    const emailHandler = (e) => {
        const emailRegex = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

        setUser({...user, email: e.target.value})
        let message;
        if (!e.target.value) {
            message = '이메일은 필수값입니다!';
            setValidate({...validate, email: false});
        } else if (!emailRegex.test(e.target.value)) {
            message = '이메일 형식이 아닙니다!';
            setValidate({...validate, email: false});
        } else {
            checkEmail(e.target.value); // 여기서 이메일 중복확인을 진행함/ 이메일 중복확인 서버통신 핸들러로 이용!
        }
        setMsg({...msg, email: message});
        setUser({...user, email: e.target.value})
    };


    // 상태변수 vaildata내부값이 모두 true인지 학인하는 함수
    const isValid = () => {    /// validate 타입 : 오브젝트임
        for(let key in validate) {
            if (!validate[key]) return false;  // 하나라도 false면 false 나옴
        }
        return true;
    };

    // 회원가입 처리 이벤트
    const joinHandler = e => { 
    
        e.preventDefault();

        // 회원입력 정보를 모두 읽어서 서버에 요청하기

        if(isValid()) { //isValid = validate값이 모두 true인지 확인하는 함수
            fetch(API_BASE_URL+'/auth/signup',{ // 스펙은 userDTO 형식에 맞춰서 진행
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }).then(res => {
                if (res.status === 200) {
                    alert('회원가입을 축하합니다!!');
                    window.location.href='/login';
                } else {
                    alert('서버에 문제가 생겼습니다. 다음에 다시 시도하세요 쏴리~');
                }
            })
        } else {
            alert('입력란을 다시 확인하세요!');
        }
    };



    return(
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
    {/* 내용이 제출될 때 joinHandler를 작동시킬거임 */}
    <form noValidate onSubmit={joinHandler}> 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                    계정 생성
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    required   // 뒤에 *만 붙음 , 실제로 안적어도 그냥 넘어감
                    fullWidth
                    id="username"
                    label="유저 이름"
                    autoFocus
                    onChange={nameHandler}
                    
                />
                <span style={validate.username ? { color:'green'} : {color:'red'}}>{msg.username}</span>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="이메일 주소"
                    name="email"
                    autoComplete="email"
                    onChange={emailHandler}
                />
                <span style={validate.email ? {color:'green'} : {color:'red'}}>{msg.email}</span>
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
                    onChange={passwordHandler}
                />
                <span style={validate.password ? {color:'green'} : {color:'red'}}>{msg.password}</span>
                
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="primary">
                    계정 생성
                </Button>
            </Grid>
        </Grid>
        <Grid container justify="flex-end">
            <Grid item>
                <Link href="/login" variant="body2">
                    이미 계정이 있습니까? 로그인 하세요.
                </Link>
            </Grid>
        </Grid>
    </form>
</Container>

       
 );
};

export  default Join;



