import React, { useState } from "react";
import * as Components from './Components';
import axios from 'axios';

var emailreg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
var pattern = new RegExp("[\u4E00-\u9FA5]+"); //判斷是否為中文

function App() {
  
  const [signIn, toggle] = React.useState(true);
  const [text, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 
  //Sign in
  const handlesSubmit = (event) => { //alert() 用來跳出提示 (警告) 對話視窗。
    event.preventDefault();

    //var emailreg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

    if (password.length === 0) {
      alert("password has left blank");
    }else if(!emailreg.test(email)){
      alert("Email Format Error");
    }else if (email.length === 0) {
      alert("Email has left blank");
    } else {

      const cors = "https://7099-182-235-153-136.jp.ngrok.io/projects";
      const api_action = "/member/register.php";
      let fData = {
        'antion':"login",
        'email':email,
        'password':password,
      }

      //fData.append('name', name);
      //fData.append('password', password);
      //fData.append('email', email);

      //GET請求
      /*axios.get('')
      .then( (response) => console.log(response))
      .catch( (error) => console.log(error))*/

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
  const handlesSignup = () => { //alert() 用來跳出提示 (警告) 對話視窗。

    //var emailreg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

    if (password.length === 0) {
      alert("password has left blank");
    }else if(password.length < 8){
      alert("Minimum password length is 8 ");
    }else if(pattern.test(password)){
      alert("Password is incorrect ");
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

  const cbshow = () => {
    var x = document.getElementById("cbpassword");
    if(x.type === "password"){
      x.type = "text";
    }else{
      x.type = "password";
    }
  }

    return (
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' placeholder='Name' value={text} onChange={(e) => setName(e.target.value)}/>
            <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Components.Input type='password' placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Components.Button value="SEND" onClick={handlesSignup}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Components.Input type='password' id="cbpassword" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <Components.Checkboxdiv>
            <Components.CheckboxInput type='checkbox' onClick={cbshow}/>
            <Components.Checkboxlabel>show password !</Components.Checkboxlabel>
            </Components.Checkboxdiv>
            <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
            <Components.Button value="SEND" onClick={handlesSubmit} >Sigin In</Components.Button>
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
