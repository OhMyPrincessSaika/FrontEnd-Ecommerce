import React from 'react'
import {TbBrandTelegram} from 'react-icons/tb';
import {Link} from 'react-router-dom';
import {AiFillLinkedin,AiFillGithub,AiFillInstagram} from 'react-icons/ai';
import {BsFacebook} from 'react-icons/bs';


const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <div className="footer-top-data text-white d-flex gap-2 align-items-center">
                <TbBrandTelegram className="fs-2"/>
                <h5 className='mb-0'>Sign up for newsletter</h5>
              </div>
            </div>
            <div className="col-7">
            <div className="input-group">
            <input type="text" className="form-control" placeholder="Your Email Address..." aria-label="Your Email Address..." aria-describedby="basic-addon2"/>
            <span className="input-group-text p-2" id="basic-addon2">
              Subscribe
            </span>
          </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">No.883, Bo Saw Oo(2) Street<br/>Dagon Myothit(North), Yangon. <br/>
                  Postal Code : 11421
                </address>
                <a href="tel:+959781252825" className="mt-3 d-block mb-2 text-white">
                  Ph : +95 781252825
                </a>
                <a href="mailto:saikakawakita69@gmail.com" className="mt-4 d-block mb-0 text-white">
                 Email: saikakawakita69@gmail.com
                </a>
                <div className="social-icons d-flex align-items-center gap-3">
                  <a href="">
                    <AiFillLinkedin className="fs-4 text-white"/>
                  </a>
                  <a href="">
                    <AiFillGithub className="fs-4 text-white"/>
                  </a>
                  <a href="">
                    <AiFillInstagram className="fs-4 text-white"/>
                  </a>
                  <a href="">
                    <BsFacebook className="fs-4 text-white"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">Privacy Policy</Link>
                <Link  to="/refund-policy" className="text-white py-2 mb-1">Refund Policy</Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link to="/terms-and-conditions" className="text-white py-2 mb-1">Terms & Conditions</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">FAQ</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">HeadPhones</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
                <Link className="text-white py-2 mb-1">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Powered by Saika.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer