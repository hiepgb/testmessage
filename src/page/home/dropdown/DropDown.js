import { useRef, useEffect } from 'react';
import { MdNotificationsNone } from 'react-icons/md';

import { MdMailOutline } from 'react-icons/md';

import { MdOutlineListAlt } from 'react-icons/md';

import { MdOutlineModeComment } from 'react-icons/md';

import { MdOutlinePermContactCalendar } from 'react-icons/md';

import { MdOutlineSettings } from 'react-icons/md';

import { MdExitToApp } from 'react-icons/md';
import { Link } from 'react-router-dom';

import './DropDown.css'

const DropDown = (props) => {
    const myRef = useRef(false)

    useEffect(() => {
        document.addEventListener('mousedown', _handleClickOutSideDropDown)
    }, [])

    const _handleClickOutSideDropDown = (e) => {
        if (e.target.src && e.target.src.indexOf('avatar.png') > -1) {
            return
        } else {
            if (myRef.current && !myRef.current.contains(e.target)) props.setDropdownIsOpen()
        }
    }

    const handleLogOut = () => {
        const checked = localStorage.getItem('rememberMe') ? JSON.parse(localStorage.getItem('rememberMe')) : false
        if (checked) {
            window.location.replace('/sign-in');
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.replace('/sign-in');
        }
    }
    return (

        <ul className="dropdown" ref={myRef}>
            <li>
                <h6 className='dropdown-header'>Account</h6>
            </li>
            <li>
                <Link>
                    <MdNotificationsNone size='1.2rem' />
                    Update
                    <span className='update'>1</span>
                </Link>
            </li>
            <li>
                <Link>
                    <MdMailOutline size='1.2rem' />
                    Messages
                    <span className='messages'>3</span>
                </Link>
            </li>
            <li>
                <Link>
                    <MdOutlineListAlt size='1.2rem' />
                    Task
                    <span className='tasks'>6</span>
                </Link>
            </li>
            <li>
                <Link>
                    <MdOutlineModeComment size='1.2rem' />
                    Comments
                    <span className='comments'>8</span>
                </Link>
            </li>
            <li>
                <h6 className='dropdown-header'>Setting</h6>
            </li>
            <li>
                <Link to="/user-info">
                    <MdOutlinePermContactCalendar size='1.2rem' />
                    Profile
                </Link>
            </li>
            <li>
                <Link to="/">
                    <MdOutlineSettings size='1.2rem' />
                    Settings
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider"></hr>
            </li>
            <li>
                <Link onClick={handleLogOut}>
                    <MdExitToApp size='1.2rem' />
                    Logout
                </Link>
            </li>
        </ul>

    )
}

export default DropDown;