
import { useContext } from "react";
import { When } from "react-if";
import { AuthContext } from "../../context/authentication";

export default function Auth(props) {

    const context = useContext(AuthContext);
    const userCanDo = context.can(props.capability);

    return (
        <When condition={context.loggedIn && userCanDo}>{props.children}</When>
    )
}