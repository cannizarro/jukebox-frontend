import { useContext, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { UserContext } from './providers/UserContextProvider';
import { loginUser, registerUser } from './actions/userActions';

export default function App() {

  const userContext = useContext(UserContext);
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if(params.get("code") && params.get("state")){
      registerUser(userContext.dispatch, params);
    }else{
      loginUser(userContext.dispatch);
    }
  }, [])
  


  return userContext.user.errorMessage ?  ( <Login/> ) : (<Home/>);
}