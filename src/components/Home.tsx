import AppNavbar from './common/AppNavbar';
import { useContext } from 'react';
import { UserContext } from '../providers/UserContextProvider';

export default function Home(){

  const userContext = useContext(UserContext);

  return (
    <div>
      <AppNavbar dispatch={userContext.dispatch}/>
      <p>Logged in as {userContext.user.displayName}</p>
    </div>
  );
}