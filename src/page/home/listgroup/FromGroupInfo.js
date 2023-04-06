import React from 'react'
import { useState, useEffect } from 'react';

import { MdOutlineClose } from 'react-icons/md'

import styled from 'styled-components'
import ViewActions from '../../../redux/actions/ViewActions';
import CustomInputNonOutline from '../../../sharecomponent/custominput/CustomInputNonOutline';
import FormGroup from './../../../sharecomponent/formgroup/FromGroup';
import userActions from './../../../redux/actions/userActions';
import { connect } from 'react-redux';

const FromGroupInfo = (props) => {
    const [groupItem, setGroupItem] = useState(props.groupItem)

    useEffect(() => {
        setGroupItem(props.groupItem)
    }, [props.groupItem])

    const handleClickIconClose = () => {
        props.toggleFormGroup(false)
    }

    const _onChangeInput = (e) => {
        console.log(e.target.name);
        setGroupItem({
            ...groupItem,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (props.buttonText === 'Create') {
            props.creatingGroup(groupItem)
        }
        else {
            props.updateGroup(groupItem)
        }
    }
    return (
        <div className={props.className}>
            <form className='form-group-info'>
                <div className='icon-close'>
                    <MdOutlineClose onClick={handleClickIconClose} />
                </div>
                <h3>GROUP INFO</h3>
                <FormGroup>
                    <CustomInputNonOutline
                        label='Name'
                        type='text'
                        name='name'
                        value={groupItem.name}
                        onChangeInput={_onChangeInput}
                    />
                </FormGroup>
                <FormGroup>
                    <CustomInputNonOutline
                        label="Type ('FRONTEND', 'BACKEND', 'FULLSTACK')"
                        type="text"
                        name="type"
                        value={groupItem.type}
                        onChangeInput={_onChangeInput}
                    />
                </FormGroup>
                <FormGroup>
                    <CustomInputNonOutline
                        label="Created Date"
                        type="text"
                        name="createdAt"
                        value={groupItem.createdAt}
                        onChangeInput={_onChangeInput}
                    />
                </FormGroup>
                <FormGroup>
                    <CustomInputNonOutline
                        label="Total Member"
                        type="text"
                        name="totalMember"
                        value={groupItem.totalMember}
                        onChangeInput={_onChangeInput}
                    />
                </FormGroup>
                <div className="btn-submit">
                    <button type="submit" onClick={handleSubmit}>{props.buttonText}</button>
                </div>
            </form>
        </div>
    )
}

const StyledFormGroupInfo = styled(FromGroupInfo)`
    .form-group-info {
        width: 500px;
        margin: auto;
        border: 1px solid rgba(0, 0, 0, .15);
        padding: 30px 60px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgb(0 0 0  / 14%);
        position: relative;
    }

    .icon-close {
        position: absolute;
        top: 6px;
        right: 6px;
        cursor: pointer;
    }

    h3 {
        text-align: center;
    }

    .form-group-info .btn-submit {
        display: flex;
        justify-content: flex-end;
    }

    .form-group-info .btn-submit button {
        background: transparent;
        border: 1px solid #39f;
        outline: none;
        padding: 5px 8px;
        border-radius: 3px;
        cursor: pointer;
    }

    .form-group-info .btn-submit button:hover {
        color: orange;
    }
`

const mapStateToProps = (state) => {
    return {
        closeFormGroup: state.userInfo.closeFormGroup
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleFormGroup: (isOpen) => {
            dispatch(ViewActions.toggleFormGroup(isOpen))
        },
        creatingGroup: (groupItem) => {
            dispatch(userActions.creatingGroup(groupItem))
        },
        updateGroup: (groupItem) => {
            dispatch(userActions.updateGroup(groupItem))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StyledFormGroupInfo)    