import { Button } from "react-bootstrap";
import { useUser } from "../context/user";

export default function Logout() {

    const { signOut } = useUser();

    return (
        <span>
            <Button onClick={signOut} variant="warning">Logout</Button>
        </span>
    )

}