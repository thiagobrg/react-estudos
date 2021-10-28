import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Layout.css"

function Layout({children}) {
  return (
    <div>
      <nav>
        <h1>Nosso App</h1>
        <Link to="/counter">Counter</Link>
        <Link to="/pessoas">Pessoas</Link>
        <Link to="/repositories">Repositories</Link>
        <Link to="/users">Users</Link>
        <Link to="/produtos">Produtos</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;