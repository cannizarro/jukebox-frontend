import { useState } from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { APP_NAME } from './constants';
import { ActionType } from '../../actions/constants/actionTypes';
import { logoutUser } from '../../actions/userActions';

export default function AppNavbar(props: PropsType) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand to="/">{APP_NAME}</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
          <NavItem>
            <NavLink href="https://open.spotify.com" target="_blank">Spotify</NavLink>
          </NavItem>
          <NavItem>
            <Button onClick={() => logoutUser(props.dispatch)}>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

type PropsType = {
  dispatch: React.Dispatch<ActionType>
}