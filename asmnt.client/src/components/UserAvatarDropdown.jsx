// components/UserAvatarDropdown.jsx
import React, { useState } from 'react';

const UserAvatarDropdown = ({ fullName = "Unknown",role, onLogout }) => {
  const initials = fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle bg-primary-content text-black">
        {initials}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <a className="justify-between">
            {fullName}
          </a>
        </li>
        <li>
          <a className="justify-between">
            Role [{role}]
          </a>
        </li>
        <li>
          <a onClick={onLogout} className="text-red-500">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserAvatarDropdown;
