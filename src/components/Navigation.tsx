import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation(): JSX.Element {
  function addActiveClass(isActive: boolean): string {
    return isActive ? 'text-orange-400' : '';
  }

  return (
    <nav className="flex justify-between items-center px-5 h-[52px] text-white bg-gray-800 shadow-lg">
      <h3 className="font-bold">
        <NavLink to="/">Repo search</NavLink>
      </h3>
      <span>
        <NavLink to="/" className={({ isActive }) => `mr-4 ${addActiveClass(isActive)}`}>
          Home
        </NavLink>
        <NavLink to="/favourites" className={({ isActive }) => addActiveClass(isActive)}>
          Favourites
        </NavLink>
      </span>
    </nav>
  );
}
