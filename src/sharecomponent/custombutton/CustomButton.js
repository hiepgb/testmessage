import React, { Component } from 'react'
import './CustomButton.css'
class CustomButton extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const {
            width,
            large,
            color,
            uppercase,
            type,
            ...otherProps
        } = this.props;

        return (
            <button className={large ? 'btn btn-lg' : 'btn'}
                type={type}
                style={{
                    width: width ? width : 'inherit',
                    textTransform: uppercase ? 'uppercase' : 'none',
                    color: color,
                    cursor: 'pointer'
                }}
                {...otherProps}
            >
                {this.props.children}
            </button >
        )
    }
}

export default CustomButton