import React, { Component } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { MdCheckBox } from 'react-icons/md'
import './CustomCheckbox.css'
class CustomCheckbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked
        }
    }
    _onclick = () => {
        this.setState({
            checked: !this.state.checked
        })
        this.props.checkboxChange(!this.state.checked)
    }
    render() {
        const { label, fontSize } = this.props
        return (
            <div className='checkbox' onClick={() => this._onclick()}>
                <div>
                    {
                        this.state.checked ? <MdCheckBox name={this.props.name} className='checkbox-checked' size={fontSize} /> : <MdCheckBoxOutlineBlank name={this.props.name} size={fontSize} />
                    }
                </div>
                <span>{label}</span>
            </div>
        )
    }
}

export default CustomCheckbox