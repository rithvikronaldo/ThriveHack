import React from "react";
import Layout from "./Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Layout/>
      <Footer/>
    </div>
  );
}

export default App;
