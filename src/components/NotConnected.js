import React from 'react'

export default function NotConnected() {
    return (
        <div className="container text-center bg-light my-5" style={{ borderRadius: 20 }}>
            <h1 className="mt-3 text-primary">Please Connect to Ropsten test network</h1>
            <a href="https://faucet.ropsten.be/" rel="noopener noreferrer" target="_blank" className="btn btn-success">Get free Ether for Ropsten test network</a>
            <h4 className="my-3">Follow these instructions for connect metamask with Ropsten test network</h4>
            <hr />

            <h6>1. Install  <a href="https://metamask.io/download.html" rel="noopener noreferrer" target="_blank" className="btn btn-outline-primary">Meta-mask</a></h6>
            <h6>2. Create Your Account</h6>
            <h6>3. Connect with Ropsten test network</h6>
            <h6>4. Get Some Free Ether by Ropsten Faucet</h6>
            <hr />
            <img className="img-fluid h-50" src="img/ropston.jpg" alt="" />

        </div>
    )
}
