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
    passwordConfirm: string;
}

const SignUp = () => {
    const locale = useContext(LocaleContext);
    const [error, setError] = useState<string | null>(null);
    const history = useHistory();

    const SignUpSchema = useMemo(
        () =>
            Yup.object().shape({
                email: Yup.string().email(locale.auth.notAnEmail).required(locale.auth.emailReq),
                password: Yup.string().required(locale.auth.passwordReq),
                passwordConfirm: Yup.string()
                    .required(locale.auth.passwordReq)
                    .min(6, locale.auth.passwordLength)
                    .oneOf([Yup.ref("password")], locale.auth.passwordMustMatch),
            }),
        [locale]
    );

    const firebaseErrors: { [string: string]: string } = useMemo(
        () => ({
            "auth/invalid-email": locale.auth.notAnEmail,
            "auth/email-already-in-use": locale.auth.emailAlreadyInUse,
            "auth/weak-password": locale.auth.weakPassword,
        }),
        [locale]
    );

    const onSubmit = (values: FormValues) => {
        setError(null);
        firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
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
        initialValues: { email: "", password: "", passwordConfirm: "" },
        validationSchema: SignUpSchema,
        onSubmit,
        validateOnChange: false,
        validateOnBlur: true,
    });

    return (
        <div>
            <h1>{locale.auth.signUp}</h1>
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
                <Form.Group>
                    <Form.Label>{locale.auth.passwordConfirm}</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwordConfirm"
                        isInvalid={!!formik.errors.passwordConfirm}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                    />
                    <Alert variant="danger" show={!!formik.errors.passwordConfirm}>
                        {formik.errors.passwordConfirm}
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

export default SignUp;
