import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { Button } from 'react-bootstrap';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("https://i.ibb.co/k1Fyvq8/Rectangle-1.png")`}} className="header">
            <img src={logo} alt=""/>
            <input type="text" placeholder="Search your Destination..." name="" id=""/>

            <nav>
                <a href="/news">News</a>
                <a href="/destination">Destination</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
                {/* <a href="/login">Login</a> */}
                <Button style={{margin:'5px'}} variant="warning"><Link to="/login">Login</Link></Button>
                <Button style={{margin:'5px'}} variant="danger" onClick={() => setLoggedInUser({})}>Sign out</Button>
            </nav>
        </div>
    );
};

export default Header;