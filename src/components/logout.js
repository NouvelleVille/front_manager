import { Button } from "react-bootstrap";
import { useUser } from "../context/user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Logout() {

    const { signOut } = useUser();
        
    return (
        <span>
            <Button onClick={signOut} variant="danger"> <FontAwesomeIcon icon={faSignOutAlt} /> Logout</Button>
        </span>
    )

}