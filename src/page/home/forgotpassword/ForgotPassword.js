import React, { useEffect, useState } from 'react'
import { MdLockOutline } from 'react-icons/md';

import './../../signin/Signin.css'
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup";
import FormGroup from './../../../sharecomponent/formgroup/FromGroup';
import CustomInput from './../../../sharecomponent/custominput/CustomInput';
import CustomButton from './../../../sharecomponent/custombutton/CustomButton';
import userActions from './../../../redux/actions/userActions';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = (props) => {
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
        }),
        onSubmit: values => {
            props.forGotPassword(values);
        }
    })

    useEffect(() => {

        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className={props.className}>
            <form className='content' onSubmit={formik.handleSubmit}>
                <h3>Forgot Password</h3>
                <FormGroup>
                    <CustomInput
                        label='Email *'
                        type='email'
                        name='email'
                        value={formik.values.email}
                        onChangeInput={formik.handleChange}
                        _onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p>{formik.errors.email}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <CustomButton
                        type='submit'
                        color='#FFFFFF'
                        width='100%'
                        uppercase
                    >
                        Submit
                    </CustomButton>
                </FormGroup>
                <FormGroup>
                    {/* <p style={{ color: 'blue' }}>{props.messageForgotPasswordSuccess}</p> */}
                    <p>{props.errorMessageForgotPassword}</p>
                </FormGroup>
            </form>
            <ToastContainer
                className='toast'
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

const ForgotPassWordStyled = styled(ForgotPassword)`
    height: calc(100vh - 108px);
    position: relative;
    width: 400px;
    
    .content {
        width: 400px;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    h3 {
        text-align: center;
    }

    .content .form-group p {
        color:  red;
        font-size: .8rem;
        position: absolute;
        top: 100%;
    }
`

const mapStateToProps = state => {
    return {
        isLoading: state.userInfo.isLoading,
        errorMessageForgotPassword: state.userInfo.errorMessageForgotPassword,
        messageForgotPasswordSuccess: state.userInfo.messageForgotPasswordSuccess
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        forGotPassword: (email) => {
            dispatch(userActions.forGotPassword(email))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassWordStyled)

// redirectUrl: "http://localhost:3000/passwordreset"