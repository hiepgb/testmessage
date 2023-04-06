import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const GroupLink = styled.div`
    .menu-item {
        display: flex;
        padding: 20px 24px;
        color: #fff;
        text-decoration: none;
        font-size: .75rem;
        align-items: center;
        font-weight: 500
    }

    .menu-item:hover {
        color: orange;
    }

    .menu-item.active {
        color: #39f !important;
    }

    .menu-item span {
        margin-left: 30px;
        font-size: .90rem;
        padding: 2.2px 0 0 0;
    }

    .menu-item i {
        font-size: .85rem;
    }
`

const CustomLinks = props => {
    return (
        <GroupLink>
            {
                props.menuLinks.map((item, index) =>
                    <NavLink
                        key={index}
                        to={item.link}
                        className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}
                    >
                        <i className={item.icon}></i>
                        <span>{item.text}</span>
                    </NavLink>
                )
            }
        </GroupLink>
    )
}

export default CustomLinks