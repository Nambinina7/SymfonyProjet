import React from 'react';
import {FaListAlt, FaCheckSquare, FaPlusSquare, FaTrash} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
const NavBar = () => (
    <footer className="d-flex justify-content-between" id="mainFooter">
        <div className="btn-group">
            {
                isAdmin &&
                <NavLink to="/produit/create" className="btn btn-outline-dark bg-light" exact={true}><FaPlusSquare /></NavLink>
            }
        </div>
    </footer>
)

export default NavBar;