import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LikeMatchNavigation = () => {
  const location = useLocation();
  const activeTab = location.pathname.includes('unmatched') ? 'unmatched' : 'matched';

  const buttonBaseStyle = {
    padding: '10px 24px',
    borderRadius: '999px',
    fontWeight: '500',
    fontSize: '14px',
    border: '1px solid #c22751',
    backgroundColor: 'transparent',
    color: '#c22751',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  };

  const activeStyle = {
    backgroundColor: '#c22751',
    color: '#fff',
    border: '1px solid #c22751'
  };

  return (
    <div className='d-flex align-items-center gap-3 justify-content-end mb-4'>
      <Link
        to="/like-match-unmatched"
        className="secondary-medium-font"
        style={{
          ...buttonBaseStyle,
          ...(activeTab === 'unmatched' ? activeStyle : {})
        }}
      >
        Unmatched Members
      </Link>
      <Link
        to="/like-match-matched"
        className="secondary-medium-font text-white"
        style={{
          ...buttonBaseStyle,
          ...(activeTab === 'matched' ? activeStyle : {})
        }}
      >
        Matched Members
      </Link>
    </div>
  );
};

export default LikeMatchNavigation;
