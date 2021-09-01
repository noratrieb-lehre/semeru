import React, { useContext, useMemo, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { LocaleContext } from "../App";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase/compat";
import { useHistory } from "react-router-dom";

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
                <Form.Group>
                    <Form.Label>{locale.auth.email}</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        isInvalid={!!formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <Alert variant="danger" show={!!formik.errors.email}>
                        {formik.errors.email}
                    </Alert>
                </Form.Group>
                <Form.Group>
                    <Form.Label>{locale.auth.password}</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        isInvalid={!!formik.errors.password}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <Alert variant="danger" show={!!formik.errors.password}>
                        {formik.errors.password}
                    </Alert>
                </Form.Group>
                <Button type="submit">{locale.auth.signIn}</Button>
                <Alert variant="danger" show={!!error}>
                    {error}
                </Alert>
            </Form>
        </div>
    );
};

export default SignIn;
