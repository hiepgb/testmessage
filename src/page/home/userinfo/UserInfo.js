import React from 'react'
import { useState, useEffect } from 'react';
import { RiFolderUploadFill } from 'react-icons/ri'
import FormGroup from './../../../sharecomponent/formgroup/FromGroup';
import CustomInput from './../../../sharecomponent/custominput/CustomInput';
import CustomButton from './../../../sharecomponent/custombutton/CustomButton';
import userActions from './../../../redux/actions/userActions';

import styled from 'styled-components';
import { connect } from 'react-redux';
const UserInfo = (props) => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        avatarUrl: ''
    })

    const [avatarUrl, setAvatarUrl] = useState('')

    const [avatarUploadFile, setAvatarUploadFile] = useState(null)

    useEffect(() => {
        props.getUserInfo(localStorage.getItem('username'))
    }, [])

    useEffect(() => {
        if (props.user.avatarUrl != null && props.user.avatarUrl != '') {
            let avatarUrl = props.user.avatarUrl
            let temp = avatarUrl.split('\\')
            setAvatarUrl(temp[temp.length - 2] + '/' + temp[temp.length - 1])
        }

        setUser({ ...props.user })
    }, [props.isLoading, props.user])

    const handleInputChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = e => {
        // e.preventDefault()
        props.updateUserInfo(user, avatarUploadFile)
    }

    const onFileChange = e => {
        setAvatarUploadFile(e.target.files[0])
        let url = URL.createObjectURL(e.target.files[0])
        setAvatarUrl(url)
    }
    return (
        <div className={props.className}>
            <div className='user-container'>
                <div className='top'>

                </div>
                <div className='overlay-top'></div>
                <div className='avatar'>
                    <img src={avatarUrl} />
                    <div className='upload'>
                        <label htmlFor='file_id'>
                            <RiFolderUploadFill color="gray" fontSize="1.2em" className="icon-upload" />
                        </label>
                        <input type='file' name='file' id='file_id' onChange={onFileChange} />
                    </div>
                </div>
                <div className='icon-plus'>
                    <span>+</span>
                </div>
                <div className='content'>
                    <form className='form-update'>
                        {props.errorMessage &&
                            <div className='error'>
                                <p>Server response status code: {props.errorMessage.statusCode}.&nbsp; </p>
                                <p>{props.errorMessage.message}</p>
                            </div>
                        }
                        {!props.errorMessage &&
                            <div className='about-user'>
                                <h1>ABOUT {props.user.username}</h1>
                                <p>
                                    FrontEnd Developer@Creative-Tim • Major interest in Web
                                    Development: motivated to achieve measurable results,
                                    to deepen my knowledge and improve my skills.
                                </p>
                            </div>
                        }
                        <div className='full-name'>
                            <FormGroup>
                                <CustomInput
                                    type='text'
                                    label='First Name *'
                                    name='firstName'
                                    value={user.firstName}
                                    onChangeInput={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <CustomInput
                                    type='text'
                                    label='Last Name *'
                                    name='lastName'
                                    value={user.lastName}
                                    onChangeInput={handleInputChange}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <CustomInput
                                type='text'
                                label='User Name *'
                                name='username'
                                value={user.username}
                                onChangeInput={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <CustomInput
                                type='text'
                                label='Email *'
                                name='email'
                                value={user.email}
                                onChangeInput={handleInputChange}
                            />
                        </FormGroup>
                        {/* <FormGroup>
                            <CustomInput
                                type='password'
                                label='Password *'
                                name='password'
                                value={user.password}
                                onChangeInput={handleInputChange}
                            />
                        </FormGroup> */}
                        <div className='btn-submit'>
                            <CustomButton
                                type='submit'
                                uppercase
                                width='100%'
                                onClick={handleSubmitForm}
                            >
                                update
                            </CustomButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const StyledUserInfo = styled(UserInfo)`
    height: 800px;
    width: 560px;
    margin: auto;
    padding: 30px 0 20px 0;

    .about-user {
        margin-top: -50px;
    }

    .about-user h1 {
        text-align: center;
        color: rgba(0, 0, 0, .4);
        font-size: 24px;
    }

    .about-user p {
        text-align: center;
        color: rgba(0, 0, 0, .5);
        font-size: .75rem;
        margin-top: 8px;
    }

    .form-update {
        width: 60%;
        margin: auto;
    }
    
    .icon-plus {
        width: 40px;
        height: 39px;
        border-radius: 50%;
        background-color: #9e27b0;
        position: absolute;
        top: 27%;
        right: 2rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .icon-plus span {
        font-size: 1.6rem;
    }


    .avatar {
        width: 130px;
        height: 130px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 22%;
        left: 2rem;
        background-position: center ;
        background-size: cover;
    }

    .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .error {
        color: red;
    }

    .error p {
        margin-bottom: 0;
    }

    .user-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        position: relative;

        overflow: hidden;
    }

    .top {
        height: 320px;
        background-image: linear-gradient(315deg, rgba(0, 128, 206, 0.8) 0%,  rgba(0, 128, 206, 0.8) 74%), url('/images/mountain.jpg');
        background-position: center;
        background-size: cover;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .overlay-top {
        height: 160px;
        background-color: #eeeeee;
        transform: rotate(-10deg);
        position: absolute;
        width: 150%;
        top: 28%;
        z-index: 0;
    }

    .content {
        background-color: #eeeeee;
        flex: 1;
        border-radius: 6px;
        position: relative;
        z-index: 2;
    }

    .full-name {
        display: flex;
    }

    .full-name > div:first-child {
        margin-right: 5px;
    }

    .full-name > div:last-child {
        margin-left: 5px;
    }

    .upload input {
        position: absolute;
        z-index: -1;
        opacity: 0;
    }

    .icon-upload {
        position: absolute;
        left: 50%;
        bottom: -17px;
        cursor: pointer;
        transform: translate(-50%, 0);
        z-index: 3;
    }

    .btn-submit {
        margin-top: 5rem;
    }
    .btn-submit .btn{
        color:#fff
    }
`

const mapStateToProps = (state) => {
    return {
        isLoading: state.userInfo.isLoading,
        user: state.userInfo.user,
        errorMessage: state.userInfo.errorMessage,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserInfo: (userName) => {
            dispatch(userActions.getUserInfo(userName))
        },
        updateUserInfo: (user, avatarUploadFile) => {
            dispatch(userActions.updateUserInfo(user, avatarUploadFile))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StyledUserInfo)