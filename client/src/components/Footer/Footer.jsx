import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo_dark} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptas porro quasi dolorem mollitia sed culpa, dolore amet rem sapiente dolor corporis odio pariatur, impedit quaerat expedita vel consequatur quam.</p>
                    <div className="flex footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-333</li>
                        <li>contact@foodify.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright {new Date().getFullYear()} @ foodify.com - All Right Reserved</p>
        </div>
    )
}

export default Footer
