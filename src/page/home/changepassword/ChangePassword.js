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
const ChangePassword = (props) => {

    const username = localStorage.getItem('username');

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validateYupSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Minimum 6 characters')
                .max(15, 'Maximum 15 characters')
                .required('Required!')
        }),
        onSubmit: values => {
            props.changePassword(username, values.password);
        }
    })

    useEffect(() => {
        props.showLoading(props.isLoading)
    }, [props.isLoading])

    return (
        <div className={props.className}>
            <form className='content' onSubmit={formik.handleSubmit}>
                <h3>Change Password</h3>
                <FormGroup>
                    <CustomInput
                        label='New Password *'
                        type='password'
                        name='password'
                        value={formik.values.password}
                        onChangeInput={formik.handleChange}
                    />
                    {
                        formik.errors.password && formik.touched.password && (
                            <p>{formik.errors.password}</p>
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
                    <p style={{ color: 'blue' }}>{props.messageChangePasswordSuccess}</p>
                    <p>{props.errorMessageChangePassword}</p>
                </FormGroup>
            </form>
        </div>
    )
}

const PasswordChangingStyled = styled(ChangePassword)`
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
        errorMessageChangePassword: state.userInfo.errorMessageChangePassword,
        messageChangePasswordSuccess: state.userInfo.messageChangePasswordSuccess,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changePassword: (username, password) => {
            dispatch(userActions.changePassword(username, password))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangingStyled)