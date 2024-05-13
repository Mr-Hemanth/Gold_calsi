import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import CSS file for styling
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
  return (
    <div className="Home">
      <div className="branding">
        <h1>Gold Shop</h1>
      </div>
      <div className="pencil-icon">
  <Link to="/edit">
    <EditIcon />
  </Link>
</div>

      <div className="options-container">
        <div className="option">
          <Link to="/gold">
            <h2>Gold</h2>
          </Link>
        </div>
        <div className="option">
          <Link to="/silver">
            <h2>Silver</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
