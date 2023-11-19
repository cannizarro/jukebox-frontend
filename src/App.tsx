import { useContext } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { UserContext } from './providers/UserContextProvider';

export default function App() {

  const userContext = useContext(UserContext);
  
  return userContext.user.username ?  (<Home/>) : ( <Login/> );
}