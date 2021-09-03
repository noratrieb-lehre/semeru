import React, { useContext, useMemo, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { LocaleContext } from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase/compat/app";
import { NavLink, useHistory } from "react-router-dom";

interface FormValues {
    email: string;
    password: string;
}

const SignIn = () => {
    const locale = useContext(LocaleContext);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    const SignInSchema = useMemo(
        () =>
            Yup.object().shape({
                email: Yup.string().email(locale.auth.notAnEmail).required(locale.auth.emailReq),
                password: Yup.string().required(locale.auth.passwordReq),
            }),
        [locale]
    );

    const firebaseErrors: { [string: string]: string } = useMemo(
        () => ({
            "auth/invalid-email": locale.auth.notAnEmail,
            "auth/user-disabled": locale.auth.userNotFound,
            "auth/user-not-found": locale.auth.userNotFound,
            "auth/wrong-password": locale.auth.incorrectPassword,
        }),
        [locale]
    );

    const onSubmit = (values: FormValues) => {
        setError(null);
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                setError(null);
                history.push("/");
            })
            .catch((err) => {
                console.error(err);
                setError(firebaseErrors[err.code]);
            });
    };

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: SignInSchema,
        onSubmit,
        validateOnChange: false,
        validateOnBlur: true,
    });

    return (
        <div>
            <h1>{locale.auth.signIn}</h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                }}
            >
                {(["email", "password"] as ["email", "password"]).map((fieldName) => (
                    <Form.Group key={fieldName}>
                        <Form.Label>{locale.auth[fieldName]}</Form.Label>
                        <Form.Control
                            type={fieldName}
                            name={fieldName}
                            isInvalid={!!formik.errors[fieldName]}
                            value={formik.values[fieldName]}
                            onChange={formik.handleChange}
                        />
                        <Alert variant="danger" show={!!formik.errors[fieldName]}>
                            {formik.errors[fieldName]}
                        </Alert>
                    </Form.Group>
                ))}
                <Button type="submit">{locale.auth.signIn}</Button>
                <Alert variant="danger" show={!!error}>
                    {error}
                </Alert>
            </Form>
            <div>
                <div>{locale.auth.noAccountYet}</div>
                <NavLink to="/sign-up">{locale.auth.signUp}</NavLink>
            </div>
        </div>
    );
};

export default SignIn;
