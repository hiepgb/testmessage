import { MdMenu } from 'react-icons/md'
import { Link } from 'react-router-dom';
import ViewActions from '../../../redux/actions/ViewActions';
import './Header.css'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import DropDown from '../dropdown/DropDown';
import userActions from './../../../redux/actions/userActions';
const Header = props => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        avatarUrl: ''
    })
    console.log();

    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        props.getUserInfo(localStorage.getItem('username'))
    }, [])

    useEffect(() => {
        if (props.user.avatarUrl != null && props.user.avatarUrl !== '') {
            let avatarUrl = props.user.avatarUrl
            let temp = avatarUrl.split('\\')
            setAvatarUrl(temp[temp.length - 2] + '/' + temp[temp.length - 1])
        }

        setUser({ ...props.user })
    }, [props.isLoading, props.user])

    const clickMenuIcon = () => {
        props.toggleSidebar();
    }

    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    const _onClickAvatar = () => {
        setDropdownIsOpen(!dropdownIsOpen)
    }

    const handleClickOutSideDropdown = () => {
        setDropdownIsOpen(false)
    }

    return (
        <div className="header">
            <div className="nav-left">
                <MdMenu className='menu-icon' onClick={clickMenuIcon} />
                <Link to="/">Dashboard</Link>
                <Link to="/user-info">User Info</Link>
                <Link to="/list-groups">List Group</Link>
                <Link to="/password-changing">Change Password</Link>
                <Link to="/settings">Settings</Link>
            </div>
            <div className='nav-right'>
                <div className='header-avatar' >
                    <p>{props.user.username}</p>
                    <img src={avatarUrl} alt="" onClick={_onClickAvatar} />
                    {/* <img src='./images/avatar.png' /> */}
                </div>
                {
                    dropdownIsOpen && <DropDown setDropdownIsOpen={handleClickOutSideDropdown} />
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {

        user: state.userInfo.user,

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getUserInfo: (userName) => {
            dispatch(userActions.getUserInfo(userName))
        },
        updateUserInfo: (user, avatarUploadFile) => {
            dispatch(userActions.updateUserInfo(user, avatarUploadFile))
        },
        toggleSidebar: () => {
            dispatch(ViewActions.toggleSidebar())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)