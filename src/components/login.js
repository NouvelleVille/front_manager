
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../context/user";
import UserErrors from "./user-errors";

export default function LoginForm() {
    const { register, handleSubmit, errors } = useForm();
    const { state, dispatch, signIn } = useUser();
    const onSubmit = payload => {
        signIn(payload)
    }
    const [errors_reseted, reset_errors] = useState(false); 
    useEffect(() => {
        if(!errors_reseted) {
            dispatch({type: 'resetErrors'})
            reset_errors(true)
        }
    }, [errors_reseted, dispatch])


    return (
        <div className="row justify-content-center  my-auto">
            <div className="col-md-6 col-lg-6 col-xl-3 mt-5">
                <div className="card">
                    <div className="card-body p-4">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <UserErrors/>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control isInvalid={!!errors.username} type="input" name="username" placeholder="Username" ref={register({ required: true })} />
                                <Form.Control.Feedback type="invalid">
                                    You must enter a username
                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control isInvalid={!!errors.password} type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                                <Form.Control.Feedback type="invalid">
                                    You must enter a password
                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!!state.trying}>
                                Submit
            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}