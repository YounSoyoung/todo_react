import React from 'react';
import {Button, Container, Grid, TextField, Typography, Link} from "@mui/material";
import { useState } from 'react';

import { API_BASE_URL } from '../config/host-config';

const Join = () => {

    //회원 입력 정보 상태관리
    const [user,setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    //검증 메시지 상태관리
    const [msg, setMsg] = useState({
        username: '',
        email: '',
        password: ''
    });
    //검증 완료 여부 상태관리
    const [validate, setValidate] = useState({
        username: false,
        email: false,
        password: false
    }); //세 값이 모두 ture가 됐을 때 회원가입이 돼야한다



    //회원이름을 입력처리 하는 이벤트 핸들러
    const nameHandler = e => {
        // console.log(e.target.value);

        const nameRegex = /^[가-힣]{2,8}$/; //이름은 2~8글자 사이 한글로만

        //이름이 정확히 쓰여진 이름인가? - 검증
        let message; // 입력사항 메시지
        if(!e.target.value){  //유저이름을 안적음
            message = '유저이름은 필수값입니다.';
            setValidate({...validate, username: false})
        }else if (!nameRegex.test(e.target.value)) { //유저가 입력한 값이 정규표현식(조건)과 일치하는지 확인한다
            message = '2글자에서 8글자 사이의 한글로 입력해주세요';
            setValidate({...validate, username: false})
        }else{
            message = '사용 가능한 이름입니다';
            setValidate({...validate, username: true})
        }

        //console.log(message);
        setMsg({...msg, username: message});

        console.log(message);

        setUser({...user, username: e.target.value}) //...user: 기존에 유저에 있는 값을 복사해서 넣어라, 만약에 username만 비어있고 email과 password에는 이미 값이 있을 경우 ...user를 사용해서 복사하여 두 값을 넣어주지 않으면 username만 들어가고 나머지는 값들은 날아간다.
    }


    // 패스워드 입력값 검증
    const passwordHandler = (e) => {
                                                                                     //8자 이상
        const pwRegex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

        let message;
        if (!e.target.value) {
            message = '비밀번호는 필수값입니다!';
            setValidate({...validate, password: false});
        } else if (!pwRegex.test(e.target.value)) {
            message = '8자리 이상의 특수문자, 숫자를 포함해주세요!';
            setValidate({...validate, password: false});
        } else {
            message = '사용할 수 있는 비밀번호입니다!';
            setValidate({...validate, password: true});
        }
        setMsg({...msg, password: message});

        setUser({...user, password: e.target.value})

    };

    // 이메일 중복확인 서버통신
    const checkEmail = (email) => {

        fetch(`${API_BASE_URL}/auth/check?email=${email}`) //+를 이용하여 URL을 완성해도 되지만 그러면 여러번 끊어줘야한다. Java에서 printf("%d와 %d 더하기", 1, 2)와 같은 개념
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

        let message;
        if (!e.target.value) {
            message = '이메일은 필수값입니다!';
            setValidate({...validate, email: false});
        } else if (!emailRegex.test(e.target.value)) {
            message = '이메일 형식이 아닙니다!';
            setValidate({...validate, email: false});
        } else {
            checkEmail(e.target.value); //형식을 다 지킨 이메일을 입력했으면 중복 확인을 한다.
        }
        setMsg({...msg, email: message});
        setUser({...user, email: e.target.value})
    };


    //상태변수 validate 내부 값이 모두 true인지 확인
    const isValid = () => {
        for(let key in validate){
            if(!validate[key]) return false;
        }
        return true;
    }

    // 회원가입 처리 이벤트
    const joinHandler = e => {
        //회원입력정보를 모두 읽어서 서버에 요청
        e.preventDefault(); //새로고침 기능 없애기

        if(isValid()){ //validate 값 모두가 true일 때 회원가입이 돼야한다 -> isValid()를 이용
            fetch(API_BASE_URL+'/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
        }).then(res => {
            if (res.status === 200) {
                alert('회원가입을 축하합니다!!');
                window.location.href='/login';
            } else {
                alert('서버에 문제가 생겼습니다. 다음에 다시 시도하세요 쏴리~');
            }
        })

        } else{
            alert('입력란을 다시 확인하세요!');
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "180px" }}>
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
                            required
                            fullWidth
                            id="username"
                            label="유저 이름"
                            autoFocus
                            onChange={nameHandler}
                        />
                        <span style={validate.username ? {color: 'green'} : {color: 'red'}}>{msg.username}</span>
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
                        <span style={validate.email ? {color: 'green'} : {color: 'red'}}>{msg.email}</span>
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

export default Join;