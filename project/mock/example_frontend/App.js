import React, {useState} from 'react';
import './App.css';
import './login.css';
import 'primereact/resources/themes/rhea/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Sidebar} from 'primereact/sidebar';
import {Menu} from 'primereact/menu';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import Logout from './Logout';
import AnnualLeave from './AnnualLeave';
import Support from './Support';


function App() {
    const [items,setItems] = useState([
        {
            label:'Home',
            icon:'pi pi-home',
            command: () => {window.location = "#/"}
        },{
            label:'Notifications',
            icon:'pi pi-bell',
            className: "p-menuitem-active",
            command: () => {window.location = "#/notifications"}
        },{
            label:'Annual Leave',
            icon:'pi pi-calendar',
            className: "p-menuitem-active",
            command: () => {window.location = "#/annualleave"}
        },{
            label:'Profile',
            icon:'pi pi-user',
            className: "p-menuitem-active",
            command: () => {window.location = "#/profile"}
        },{
            label:'Admin',
            icon:'pi pi-cog',
            className: "p-menuitem-active",
            command: () => {window.location = "#/settings"}
        },{
            label:'Support',
            icon:'pi pi-question-circle',
            className: "p-menuitem-active",
            command: () => {window.location = "#/support"}
        },
        {
            label:'Logout',
            icon:'pi pi-power-off',
            command: () => {window.location = "#/logout"}
        }
    ])
    const [loggedIn,setLoggedIn] = useState(false)
    if(!loggedIn){
        return (
            <div className="container1">
                    <form onSubmit={()=>setLoggedIn(true)}> {/* can be onSubmit={()=>setLoggedIn(!loggedIn)}*/}
                        <div className="avatarcontainer">
                            <img src="avatar.png" className="avatarimage"/>
                        </div>

                        <label htmlFor="uname">
                            <b>Username</b>
                        </label>
                        <input type="text" placeholder="Enter Username" name="uname" required/>

                        <label htmlFor="psw">
                            <b>Password</b>
                        </label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>

                        <button className="loginbutton" type="submit">Login</button>

                        <label>
                            <input type="checkbox" checked="checked"/> Remember me
                        </label>
                        <br/>
                        <a href="#" style={{color: "white", textDecoration: "underline"}}>Forgot password?</a>
                    </form>
                </div>
        )
    }
    return (
        <Router>
            <div className="App" >
                <Sidebar position="left" visible={true} showCloseIcon={false} dismissable={false} modal={false}
                    style={{padding:0, width:'175px'}}>
                    <Menu model={items}
                    style={{width: '100%', height:'100%'}}/>
                </Sidebar>
                <div style={{marginLeft:"175px", padding:'15px'}}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/Profile" component={Profile} />
                        <Route path="/annualleave" component={AnnualLeave} />
                        <Route path="/logout" component={Logout} />
			<Route path="/support" component={Support} />
                    </Switch>
                </div>
            </div>
        </Router>
    )

}

export default App