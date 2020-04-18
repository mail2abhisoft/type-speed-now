import React from 'react';

export const Sidebar = (props) => {
    return (
        <div>
            
            <div class="sidebarMenu">
                <ul className="sidebarMenuInner">
                    <li class="active"><i className='fa fa-play'></i><a href="https://vanila.io" target="_blank">Typing Test</a></li>
                    <li><i className='fa fa-forward'></i><a href="https://vanila.io" target="_blank">Typing Test(Advanced)</a></li>
                    <li><i className='fa fa-cog'></i><a href="https://vanila.io" target="_blank">Custom Typing Test</a></li>
                    <li><i className='fa fa-users'></i><a href="https://vanila.io" target="_blank">Multiplayer Typing Test</a></li>
                    <li><i className='fa fa-trophy'></i><a href="https://vanila.io" target="_blank">Typing Competition</a></li>
                    <li><i className='fa fa-file-text'></i><a href="https://vanila.io" target="_blank">Text Practice</a></li>
                    <li><i className='fa fa-bar-chart-o'></i><a href="https://vanila.io" target="_blank">Top 1000</a></li>                    
                </ul>
            </div>
            <br />
            <div class="sidebarMenu">
                <ul className="sidebarMenuInner">
                    <li><i className='fa fa-user'></i><a href="https://vanila.io" target="_blank">Profile</a></li>
                    <li><i className='fa fa-cog'></i><a href="https://vanila.io" target="_blank">Setting</a></li>
                    <li><i className='fa fa-bell'></i><a href="https://vanila.io" target="_blank">Notification</a></li>
                    <li><i className='fa fa-sign-out'></i><a href="https://vanila.io" target="_blank">Logout</a></li>                  
                    <li><i className='fa fa-phone'></i><a href="https://vanila.io" target="_blank">Contact</a></li>                  
                    <li><i className='fa fa-forumbee'></i><a href="https://vanila.io" target="_blank">Forum</a></li>                  
                </ul>
            </div>
        </div>
    )
}