import { useEffect } from "react"; // Add this import
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { innerpages } from "../Constant/Index";
import { Link } from "react-router-dom";

function AccessNotAllowed() {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.minHeight = "";
    };
  }, []);

  return (
    <>
      <Header />

      <section className="term_sec">
        <div className="container" style={{ color: "#fff" }}>
          <div className="age-restriction-container">
            <div className="age-warning-card">
              {/* Warning Icon */}
              <div className="warning-icon">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 17V17.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Main Message */}
              <h1 className="main-title">Age Restriction</h1>
              <p className="main-message">
                We're sorry, but you must be <strong>18 years or older</strong>{" "}
                to access this content.
              </p>

              {/* Additional Information */}
              <div className="additional-info">
                <p>
                  This site contains content that is restricted to adults only
                  in compliance with legal requirements and our terms of
                  service.
                </p>
              </div>

              {/* Action Section */}
              <div className="action-section">
                <p className="return-message">
                  If you believe you've reached this message in error, please
                  contact support.
                </p>
                <Link
                  to="/"
                  //   className="home-btn text-decoration-none text-white"
                  className="submit_signup_btn w-100 main-wrapper-btn-wrap text-decoration-none text-white mt-2 border text-center px-3 gradient-button"
                >
                  {" "}
                  Go to Homepage
                </Link>
              </div>

              {/* Legal Notice */}
              <div className="legal-notice">
                <small>
                  By continuing, you confirm that you are of legal age and agree
                  to our
                  <Link to="/terms-condition">Terms & Conditions</Link> and
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .term_sec {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
        }

        .age-restriction-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }

        .age-warning-card {
          background: rgba(
            0,
            0,
            0,
            0.7
          ); /* Darker background for better contrast over background image */
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 500px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .warning-icon {
          color: #ff6b6b;
          margin-bottom: 20px;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .main-message {
          font-size: 1.3rem;
          margin-bottom: 20px;
          line-height: 1.5;
          color: #f8f9fa;
        }

        .main-message strong {
          color: #ffd700;
          font-size: 1.4rem;
        }

        .additional-info {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 15px;
          margin: 25px 0;
          border-left: 4px solid #ff6b6b;
        }

        .additional-info p {
          margin: 0;
          font-size: 1rem;
          color: #e9ecef;
          line-height: 1.4;
        }

        .action-section {
          margin: 30px 0;
        }

        .return-message {
          font-size: 0.95rem;
          color: #ced4da;
          margin-bottom: 20px;
        }

        .return-btn,
        .home-btn {
          background: #4dabf7;
          color: white;
          border: none;
          padding: 12px 24px;
          margin: 5px 10px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 180px;
        }

        .home-btn {
          background: transparent;
          border: 2px solid #4dabf7;
        }

        .return-btn:hover {
          background: #339af0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .home-btn:hover {
          background: rgba(77, 171, 247, 0.1);
          transform: translateY(-2px);
        }

        .legal-notice {
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .legal-notice small {
          color: #adb5bd;
          font-size: 0.85rem;
        }

        .legal-notice a {
          color: #4dabf7;
          text-decoration: none;
          margin: 0 4px;
        }

        .legal-notice a:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .age-warning-card {
            padding: 30px 20px;
            margin: 20px;
          }

          .main-title {
            font-size: 2rem;
          }

          .main-message {
            font-size: 1.1rem;
          }

          .return-btn,
          .home-btn {
            display: block;
            width: 100%;
            margin: 10px 0;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.8rem;
          }

          .main-message {
            font-size: 1rem;
          }

          .warning-icon svg {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </>
  );
}

export default AccessNotAllowed;
