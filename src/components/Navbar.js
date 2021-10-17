import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import Identicon from 'identicon.js';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent ">
        <div className="container">
          <Link className="navbar-brand" to="/"><b>Our Decentralized Storage (ODS)</b></Link>

          <div className="ms-auto d-flex align-items-center text-light" >

            <Link to='/uploadfiles' className="btn btn-outline-light mr-2">
              <i className="bi bi-plus-circle-dotted" ></i>
            </Link>
              {this.props.account &&
            <Link to="/"  >
                <img
                  className='ml-2'
                  width='30'
                  style={{ borderRadius: 20 }}
                  height='30'
                  alt="logo"
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
            </Link>
              }

          </div>


        </div>
      </nav>

    );
  }
}

export default Navbar;
