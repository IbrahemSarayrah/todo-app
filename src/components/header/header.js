
import { Button } from '@blueprintjs/core';
import { AuthContext } from "../../context/authentication";
import { useContext } from 'react';
import { When } from "react-if";

function Header () {

  const context = useContext(AuthContext);

    return (
      <When condition={context.loggedIn}>
      <header className={"appHeader"}>
        <h1>ToDo App</h1>
      <Button className="logout" type="button" onClick={context.logout}> Logout </Button>
      </header>
    </When>
    );
  }

export default Header;