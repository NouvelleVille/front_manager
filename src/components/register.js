
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useUser } from "../context/user";
import UserErrors from "./user-errors";

export default function RegisterForm() {
    const { register, handleSubmit, errors } = useForm();
    const { state, dispatch, signUp } = useUser();
    const onSubmit = payload => {
        signUp(payload.signup_username, payload.signup_email, payload.signup_password);
    }

    const [errors_reseted, reset_errors] = useState(false); 
    useEffect(() => {
        if(!errors_reseted) {
            dispatch({type: 'resetErrors'})
            reset_errors(true)
        }
    }, [errors_reseted, dispatch])



    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-3  mt-5">
                <div className="card">
                    <div className="card-body p-4">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <UserErrors/>
                            <Form.Group controlId="formBasicUserName-signup">
                                <Form.Label>Username</Form.Label>
                                <Form.Control isInvalid={!!errors.signup_username} autoComplete="username" type="input" name="signup_username" placeholder="Username" ref={register({
                                    required: "You must specify a username",
                                    minLength: {
                                        value: 4,
                                        message: "Username must have at least 4 characters"
                                    }
                                })} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.signup_username && <span>{errors.signup_username.message}</span>}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail-signup">
                                <Form.Label>Email</Form.Label>
                                <Form.Control isInvalid={!!errors.signup_email} type="input" autoComplete="email" name="signup_email" placeholder="Email" ref={register({
                                    required: "You must specify an email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Entered value does not match email format"
                                    }
                                }
                                )} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.signup_email && <span>{errors.signup_email.message}</span>}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group controlId="formBasicPassword-signup">
                                <Form.Label>Password</Form.Label>
                                <Form.Control isInvalid={!!errors.signup_password} type="password" autoComplete="new-password" name="signup_password" placeholder="Password" ref={register({
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have at least 6 characters"
                                    }
                                })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.signup_password && <span>{errors.signup_password.message}</span>}
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