import { MdControlCamera } from 'react-icons/md'
import CustomLinks from './../../../sharecomponent/customlinks/CustomLinks';
import { menuLinks } from './../../../data/menulink';
import './Sidebar.css'
import { connect } from 'react-redux';
const Sidebar = props => {
    return (
        <div className={props.sidebarIsOpen ? 'sidebar' : 'sidebar close'}>
            <div className="sidebar-header">
                <img src="images/logoreact.png" />
                <h3>Final Exam React.js</h3>
            </div>
            <div className="sidebar-menu">
                <div className="dashboard">
                    <MdControlCamera className='icon' size='1.5rem' />
                    <span>Dashboard</span>
                    <span>new</span>
                </div>
                <CustomLinks menuLinks={menuLinks} />
            </div>
            <div className='sidebar-bottom'>
                <h4>Create Active</h4>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sidebarIsOpen: state.view.sidebarIsOpen
    }
}

export default connect(mapStateToProps, null)(Sidebar)