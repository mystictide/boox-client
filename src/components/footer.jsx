import { ImTwitter, ImFacebook, ImInstagram, ImYoutube } from "react-icons/im";

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <nav className="footer-nav">
          <ul>
            <li>About</li>
            <li>News</li>
            <li>Help</li>
            <li>Terms</li>
            <li>API</li>
            <li>Repository</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="socials">
          <ul>
            <li>
              <a href="a">
                <ImTwitter />
              </a>
            </li>
            <li>
              <a href="b">
                <ImFacebook />
              </a>
            </li>
            <li>
              <a href="c">
                <ImInstagram />
              </a>
            </li>
            <li>
              <a href="d">
                <ImYoutube />
              </a>
            </li>
          </ul>
        </div>
        <h6 className="copyright">
          © TRDB - The Review Database, Made by a lone mad-man. Film data
          provided most generously by TMDb.
        </h6>
      </div>
    </footer>
  );
}

export default Footer;
