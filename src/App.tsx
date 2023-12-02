import { useContext } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { UserContext } from './providers/UserContextProvider';
import AppNavbar from './components/common/AppNavbar';

export default function App() {

  const userContext = useContext(UserContext);

  const currentYear = (new Date()).getFullYear();
  const copyrightString = currentYear === 2023 ?  "2023" : "2023-" + currentYear;
  
  return (
    <>
      <AppNavbar dispatch={userContext.dispatch} isLoggedIn={Boolean(userContext.user.username)}/>
      <main>{userContext.user.username ?  <Home/> : <Login/>}</main>
      <footer className="py-4 bg-dark d-flex text-light justify-content-around">
        <div className="d-flex flex-column align-items-center">
          <img src="logo.svg" className="logo"/>
          <small className="">© {copyrightString}</small>
        </div>
      </footer>
    </>
    );
}