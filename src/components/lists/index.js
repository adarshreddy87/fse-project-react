import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Lists = () => {
  return (
    <div>
      <h1>Lists Screen</h1>
      <ul className="mt-4 nav nav-pills nav-fill">
        <li className="nav-item">
          <Link to="/lists/users" className='nav-link active'>
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/lists/myusers" className='nav-link active'>
            My Users List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/lists/myusers/tuits" className='nav-link active'>
            Tuits
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Lists;