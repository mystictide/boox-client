import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Home from "./pages/main/home";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <div id="main" className="main">
            <Routes>
              <Route path="/" element={<Home />}></Route>{" "}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
