import './App.css'
import { useCookies } from 'react-cookie';

function App() {
  const params = new URLSearchParams(window.location.search);
  const [cookie, setCookie] = useCookies(['user']);
  params.get('cookie') && setCookie('session', params.get('cookie'), {path: '/'});

  return (
    <>
      {
        params.get("error") ? 
          <p>Error occured in auth: {params.get("error")}</p> :
          cookie.session ?
            <p>Logged in</p> :
            <a href='http://localhost:8000/jukebox/login'>Login with spotify</a>}
    </>
  )
}

export default App
