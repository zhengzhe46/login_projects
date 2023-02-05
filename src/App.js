import React, { useState } from "react";
import * as Components from './Components';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { Form, Input } from 'antd';

var emailreg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//var pattern = new RegExp("[\u4E00-\u9FA5]+"); //判斷是否為中文

function App() {
  
  const [signIn, toggle] = React.useState(true);
  const [text, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length < 6) {
      return 'weak';
    }
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    switch (strength) {
      case 1:
        return 'weak';
      case 2:
        return 'fair';
      case 3:
        return 'strong';
      case 4:
        return 'very strong';
      default:
        return 'weak';
    }
  };
  const PasswordStrengthCheck = (rule, value) => {
    if (!value) {
      return Promise.reject('Please input your password!');
    }
  
    // your custom password strength check logic
    const passwordStrength = checkPasswordStrength(value);
    if (passwordStrength === 'weak') {
      return Promise.reject('Password is too weak');
    }

    if (passwordStrength === 'fair') {
      return Promise.reject('Password is too fair');
    }
    if (passwordStrength === 'strong') {
      return Promise.reject('Password is strong');
    }
    if (passwordStrength === 'very strong') {
      return Promise.reject('Password is very strong');
    }
  
    return Promise.resolve();
  };
  
  //Sign in
  const handlesSubmit = (e) => { //alert() 用來跳出提示 (警告) 對話視窗。
    e.preventDefault();//阻止表單提交

    if (!password) {
      alert("password has left blank");
    }else if(!emailreg.test(email)){
      alert("Email Format Error");
    }else if (email.length === 0) {
      alert("Email has left blank");
    } else {

      const cors = "https://339b-182-235-153-136.jp.ngrok.io/projects";
      const api_action = "/member/register.php";
      let fData = {
        'antion':"login",
        'email':email,
        'password':password,
      }

      //POST請求
      axios.post(`${cors}${api_action}`, fData)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  //Sign up
  const handlesSignup = (e) => { //alert() 用來跳出提示 (警告) 對話視窗。
    e.preventDefault();//阻止表單提交

    if (!password) {
      alert("password has left blank");
    }else if(!emailreg.test(email)){
      alert("Email Format Error");
    }else if (email.length === 0) {
      alert("Email has left blank");
    } else {

      const cors = "/projects";
      const api_action = "/member/register.php";
      let fData = {
        'antion':"signup",
        'name':text,
        'email':email,
        'password':password,
      }

      //POST請求
      axios.post(`${cors}${api_action}`, fData)
      .then(response => alert(response.data))
      .catch(error => alert(error));
    }
  }

    return (
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Form name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 100 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off">

              <Components.Title>Create Account</Components.Title>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
              <Input type='text' placeholder='UserName' value={text} onChange={(e) => setName(e.target.value)}/>
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
              <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Item>

              <Form.Item
              name="password"
              rules={[{
                validator: PasswordStrengthCheck,
              }]}
              >
              <Input.Password type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              </Form.Item>
              <Form.Item
                  name="confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("The passwords that you entered don't match!"));
                      },
                    }),
                  ]}
                >
              <Input.Password placeholder="confirm Password"/>
              </Form.Item>

              <Components.Button value="SEND" onClick={handlesSignup}>Sign Up</Components.Button>
            </Form>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
          <Form name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 100 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off">
              <Components.Title>Sign in</Components.Title>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your  E-mail!' }]}
              >
              <Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Item>

              <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              >
              <Input.Password type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              </Form.Item>
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button value="SEND" onClick={handlesSubmit} >Sigin In</Components.Button>
            </Form>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>

            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>

          </Components.Overlay>
        </Components.OverlayContainer>

      </Components.Container>
    )
  }
  // function App() {
  //   const[name, setName] = useState('');
  //   const[password, setPassword] = useState('');
  //   const[email, setEmail] = useState('');

  //   const handlesSubmit = () => { //alert() 用來跳出提示 (警告) 對話視窗。
  //     if(name.length === 0){
  //       alert("Name has left blank");
  //     }else if(password.length === 0){
  //       alert("Mobile has left blank");
  //     }else if(email.length === 0){
  //       alert("Email has left blank");
  //     }else{
  //       const url = "http://localhost/projects/member/register.php";

  //       let fData = new FormData();
  //       fData.append('name',name);
  //       fData.append('password',password);
  //       fData.append('email',email);

  //       //GET請求
  //       /*axios.get('')
  //       .then( (response) => console.log(response))
  //       .catch( (error) => console.log(error))*/


  //       //POST請求
  //       axios.post(url, fData)
  //       .then(response=>alert(response.data))
  //       .catch(error=>alert(error));
  //     }

  //   }

  //   return (
  //     <>
  //       <div className="container" >
  //         <label htmlFor ="name">Name</label>
  //         <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
  //         <label htmlFor ="password">Password</label>
  //         <input type="text" name="mobile" id="mobile" value={password} onChange={(e) => setPassword(e.target.value)}/>
  //         <label htmlFor ="email">Email</label>
  //         <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
  //         <input type="button" name="send" id="send" value="SEND" onClick={ handlesSubmit }/>
  //       </div>
  //     </>
  //   );
  // }

  export default App;
