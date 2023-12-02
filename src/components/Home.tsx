import { useContext } from 'react';
import { UserContext } from '../providers/UserContextProvider';

export default function Home(){

  const userContext = useContext(UserContext);

  return (
    <div className="activity">
      <p>Logged in as {userContext.user.displayName}</p>
    </div>
  );
}