import React from 'react';
import logo from '../images/logo.png';

export const Header = (props) => {
    return (
        <div className='header'>
            <ul className='header-items '>
                <li>
                    <a style={{ flex: 'auto' }}><img width="170" height="50" src={logo} alt="logo" /></a>
                    <a>Forum</a>
                    <a>Contact</a>
                    <a>FAQ</a>
                </li>
            </ul>
            <hr class="hr-header" />
            <ul className='header-items breadcrumb'>
                <li>
                    <a style={{ flex: 'auto' }}>Language:&nbsp;&nbsp;English&nbsp;<i style={{ marginTop: '3px' }} class="fa fa-angle-double-down"></i></a>
                    <a>647 Users Online</a>
                    <a>Notifications </a>
                    <a>Login&nbsp;&nbsp;|&nbsp;&nbsp;Register </a>
                </li>
            </ul>
        </div>
    )
}