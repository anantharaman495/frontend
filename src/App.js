import React from 'react';
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './LoginForm';
import SubmitButton from './SubmitButton';

import './App.css';

class App extends React.Component {
// componentDidMount -- When App component Loads it checks whether the user is loggedIn
  async componentDidMount(){
    try{
      let res=await fetch('/isLoggedIn',{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      let result=await res.json();
      if (result && result.success){
        UserStore.loading=false;
        UserStore.isLoggedIn=true;
        UserStore.username=result.username;   
      }
      else{
        UserStore.loading=false;
        UserStore.isLoggedIn=false;
      }
    }
    catch(e){
      console.log('componentDidMount-->'+e)
      UserStore.loading=false;
      UserStore.isLoggedIn=false;
    }
  }

  //For Logout
  async doLogout(){
    try{
      let res=await fetch('/logut',{
        method:'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
      });
      let result=await res.json();
      if (result && result.success){
        UserStore.isLoggedIn=false;
        UserStore.username='';
      }
    }
    catch(e){
      console.log('doLogut -->'+e)
    }
  }

  render() {
    if(UserStore.loading){
      return <div className="app">
        <div className="container">
          Loading, Please Wait !!!
          </div>
      </div>;
    }
    else{
      if(UserStore.isLoggedIn){
        return <div className="app">
        <div className="container">
         Welcome {UserStore.username}
         <SubmitButton text={'Logout'}
                        disabled={false}
                        onClick={ ()=>this.doLogout()}
          />
          </div>
      </div>;
      }
    }

    return (<div className="app">
        <div className="container">
            <LoginForm/>
        </div>
      </div>
      );
  }
}
export default observer(App);
