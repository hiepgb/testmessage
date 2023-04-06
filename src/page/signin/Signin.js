import React, { useEffect, useState } from 'react'
import { MdLockOutline } from 'react-icons/md';
import FormGroup from './../../sharecomponent/formgroup/FromGroup';
import CustomInput from './../../sharecomponent/custominput/CustomInput';
import CustomCheckbox from './../../sharecomponent/customcheckbox/CustomCheckbox';
import CustomButton from './../../sharecomponent/custombutton/CustomButton';
import { Link } from 'react-router-dom';

import './Signin.css'
import userActions from './../../redux/actions/userActions';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from "yup";
const Signin = (props) => {

    const [checked, setChecked] = useState(() => {
        return localStorage.getItem('rememberMe') ? JSON.parse(localStorage.getItem('rememberMe')) : false
    })
    const [user, setUser] = useState(() => {
        return localStorage.getItem('username') ? localStorage.getItem('username') : ''
    })
    console.log(user);
    console.log(checked);
    const [userSignIn, setUserSignIn] = useState({
        username: '',
        password: '',
        rememberMe: false
    })

    const formik = useFormik({
        initialValues: {
            username: user,
            password: '',
            rememberMe: false
            
        },
        //validation
        validationSchema: Yup.object({
            username: Yup.string()
                .min(2, 'Minimum 2 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!'),
            password: Yup.string()
                .min(2, 'Minimum 6 characters')
                .max(500, 'Maximum 15 characters')
                .required('Required!'),
        }),

        onSubmit: values => {
            // console.log(values);
            // console.log(userSignIn);
            const test = {...values, rememberMe: userSignIn.rememberMe}
            props.signin(test)
        }
    })
    // const handleSubmitForm = (e) => {
    //     e.preventDefault()
    //     props.signin(userSignIn.username, userSignIn.password)
    // }

    // const handleOnChangeInput = e => {
    //     setUserSignIn({
    //         ...userSignIn,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleCheckboxChange = checked => {
        setUserSignIn({
            ...userSignIn,
            rememberMe: checked
        })
    }

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className="signin-container">
            <div className="signin-header">
                <div className="signin-avatar">
                    <MdLockOutline size='1.36rem' />
                </div>
                <h1>Sign in</h1>
            </div>
            <form className="signin-main" onSubmit={formik.handleSubmit}>
                <p>{props.errorMessageSignin}</p>
                <FormGroup>
                    <CustomInput
                        label="Username *"
                        type="text"
                        name="username"
                        value={formik.values.username}
                        
                        // onChangeInput={handleOnChangeInput}
                        onChangeInput={formik.handleChange}>

                    </CustomInput>
                    {
                        formik.errors.username && formik.touched.username && (
                            <p style={{ color: 'red' }}>{formik.errors.username}</p>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <CustomInput
                        label="Password *"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChangeInput={formik.handleChange}
                    >
                    </CustomInput>
                    {
                        formik.errors.password && formik.touched.password && (
                            <p style={{ color: 'red' }}>{formik.errors.password}</p>
                        )
                    }

                </FormGroup>
                <div className="remember-me">
                    <CustomCheckbox
                        fontSize="24px"
                        name="rememberMe"
                        label="Remember me"
                        checked={checked}
                        checkboxChange={handleCheckboxChange}
                    />
                </div>

                <div className="btn-submit">
                    <CustomButton
                        type="submit"
                        uppercase
                        width="100%"
                        // onClick={handleSubmitForm}
                        color="white"
                    >
                        Sign In
                    </CustomButton>
                </div>

                <div className='group-link'>
                    <Link to="/forgot-password">Forgot password?</Link>
                    <Link to="/sign-up">Don't have an account? Sign Up</Link>
                </div>
                <p className="copy-right"> Copyright &copy; &nbsp;
                    <Link to="/">Your Website</Link>&nbsp;2022
                </p>
            </form>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.userInfo.isLoading,
        errorMessageSignin: state.userInfo.errorMessageSignin
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        signin: (user) => {
            dispatch(userActions.signInUser(user))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin)