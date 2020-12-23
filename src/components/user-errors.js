import { useUser } from "../context/user";
import { Alert } from "react-bootstrap";

export default function UserErrors () {
    const { state} = useUser();
    let successMessage = '';
    let errorMessage = '';

    if(state.success) {
        successMessage = <Alert className="alert alert-success bg-success text-white border-0 show" key="user-success"  variant="success">
            {state.success}
        </Alert>
    }

    if (state.errors && state.errors.length === 1) {
        errorMessage = <Alert className="alert alert-danger bg-danger text-white border-0 show" key="users-errors" variant="danger">
            {state.errors[0]}
        </Alert>
    } else if (state.errors && state.errors.length > 1) {
        errorMessage = <Alert key="user-errors" variant="danger">
            <ul>
            {
                Object.keys(state.errors).map((item, i) => (
                    <li key={i}>
                        <span key={i}>{state.errors[i]}</span>
                    </li>
                ))
            }
            </ul>
        </Alert>
    }

    return (
        <span>{successMessage}{errorMessage}</span>
    )

}