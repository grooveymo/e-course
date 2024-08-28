import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContextProvider';
import { PersonIcon } from '@radix-ui/react-icons';

import './Header.css';

const Header: React.FC = () => {
  const { user } = useAuth();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="user">
            <PersonIcon color="#00ff00" />@{user?.name}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
