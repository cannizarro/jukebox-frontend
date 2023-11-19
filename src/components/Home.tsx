import AppNavbar from './common/AppNavbar';
import { Container } from 'reactstrap';
import { useContext } from 'react';
import { UserContext } from '../providers/UserContextProvider';

export default function Home(){

  const userContext = useContext(UserContext);

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
            {  
              <p>Logged in as {userContext.user.displayName}</p>
            }
        </div>
      </Container>
    </div>
  );
}