import React from 'react';
import {Feed, Navbar, Rightbar, Sidebar} from '../../components';
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
