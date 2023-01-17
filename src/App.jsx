import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Header from "./components/header";
import ListingManager from "./pages/listing/listingManager";
import Home from "./pages/main/home";
import UserSettings from "./pages/main/userSettings";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <div id="main" className="main">
            <Routes>
              <Route path="/">
                <Route path=":param" element={<Home />} />
                <Route path="" element={<Home />} />
              </Route>
              <Route path="/settings" element={<UserSettings />}></Route>
              <Route path="/listing/new" element={<ListingManager />}></Route>
              <Route path="/listing/:id" element={<ListingManager />}></Route>
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
