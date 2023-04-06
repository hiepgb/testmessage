import React from 'react'
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup'
import { useEffect } from 'react';
import FormGroup from '../../../sharecomponent/formgroup/FromGroup';
import CustomInput from './../../../sharecomponent/custominput/CustomInput';
import CustomButton from '../../../sharecomponent/custombutton/CustomButton';
import userActions from './../../../redux/actions/userActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
const ResetPassword = (props) => {


    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    // console.log("token", token);
    // const username = localStorage.getItem('username');
    
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
            token
        },
        validateYupSchema: Yup.object({
            newPassword: Yup.string()
                .min(6, 'Minimum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!'),
            confirmPassword: Yup.string()
                .required('Required!')
                .oneOf([Yup.ref('newPassword')], 'Password must match')
        }),
        onSubmit: values => {
            console.log(values);
            props.resetPassword(values);
        }
    })

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className={props.className}>
            <form className='content' onSubmit={formik.handleSubmit}>
                <h3>Reset Password</h3>
                <FormGroup>
                    <CustomInput
                        label='New Password *'
                        type='password'
                        name='newPassword'
                        value={formik.values.newPassword}
                        onChangeInput={formik.handleChange}
                    />
                    {
                        formik.errors.newPassword && formik.touched.newPassword && (
                            <p>{formik.errors.newPassword}</p>
                        )
                    }
                </FormGroup>
                <FormGroup>
                    <CustomInput
                        label='Confirm Password *'
                        type='password'
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChangeInput={formik.handleChange}
                    />
                    {
                        formik.errors.confirmPassword && formik.touched.confirmPassword && (
                            <p>{formik.errors.confirmPassword}</p>
                        )
                    }
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
                    <p style={{ color: 'blue' }}>{props.messageResetPasswordSuccess}</p>
                    <p>{props.errorMessageResetPassword}</p>
                </FormGroup>
            </form>
        </div>
    )
}

const ResetPasswordStyled = styled(ResetPassword)`
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

const mapStateToProps = (state) => {
    return {
        isLoading: state.userInfo.isLoading,
        errorMessageResetPassword: state.userInfo.errorMessageResetPassword,
        messageResetPasswordSuccess: state.userInfo.messageResetPasswordSuccess,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        resetPassword: (newPassword, token) => {
            dispatch(userActions.resetPassword(newPassword, token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordStyled)