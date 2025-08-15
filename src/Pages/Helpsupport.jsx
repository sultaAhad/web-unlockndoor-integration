import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";

function Helpsupport() {
  return (
    <>
      <Header />
      {/* Help & Support Section */}
      <section className="term_sec">
        <div className="container">
          <div className="terms_head">
            <h2 style={{ color: "#fff" }}>
              <span className="gradient-text">Help & Support</span>
            </h2>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="terms_para" style={{ color: "#fff" }}>
                <h4 className="gradient-text">Get the Assistance You Need</h4>
                <p>
                  UnlockNthedoor is built to be simple, but questions can still come up. This section offers support for everything from login issues to account questions and reporting tools.
                </p>

                <h4 className="gradient-text">Account and Profile Issues</h4>

                <h5>Login or Registration Problems</h5>
                <ul>
                  <li>Forgotten your password? Use the password reset link.</li>
                  <li>Still can’t log in? Contact support with your registered email.</li>
                </ul>

                <h5 >Profile Management</h5>
                <ul>
                  <li>To update details like age, location, or interests, visit your profile settings.</li>
                  <li>
                    Is the profile photo not showing? Make sure it meets the upload requirements (JPEG or PNG,
                    clear image, no filters).
                  </li>
                </ul>

                <h4 className="gradient-text">Messaging and Safety Tools</h4>

                <h5 >Can’t Message Someone?</h5>
                <ul>
                  <li>Premium accounts may be required to start certain conversations.</li>
                  <li>If you were blocked, that user won’t receive your messages.</li>
                </ul>

                <h5 >Safety First</h5>
                <ul>
                  <li>Use the Report feature to flag suspicious behavior.</li>
                  <li>Block users who make you uncomfortable—they won’t be able to contact you again.</li>
                  <li>
                    Never send money or share personal banking info with anyone you’ve just met online.
                  </li>
                </ul>

                <h4 className="gradient-text">Subscription and Payment</h4>

                <h5 >Managing Subscriptions</h5>
                <ul>
                  <li>You can upgrade, downgrade, or cancel through the Billing section.</li>
                  <li>Cancel before your renewal date to avoid being charged for the next cycle.</li>
                </ul>

                <h5 >Payment Issues</h5>
                <ul>
                  <li>Ensure your payment method is active and details are correct.</li>
                  <li>Contact your bank if the payment still fails.</li>
                </ul>

                <h4 className="gradient-text">Technical Troubleshooting</h4>

                <h5 >App Not Loading or Slow?</h5>
                <ul>
                  <li>Try clearing your browser cache or updating the app.</li>
                  <li>Switch devices to isolate the issue.</li>
                </ul>

                <h5 >Images Not Uploading?</h5>
                <ul>
                  <li>Make sure the image is under the size limit and in the accepted format.</li>
                </ul>

                <h4 className="gradient-text">Still Need Help?</h4>
                <p>
                  <strong>Email:</strong> <span className="gradient-text" > support@UnlockNthedoor.com </span><br />
                  <strong>Response time:</strong> 24–48 hours<br />
                  For urgent issues such as safety concerns or payment disputes, mark your message as
                  <em className="gradient-text"> “High Priority”</em> in the subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======================= */}
      <Footer />
    </>
  );
}

export default Helpsupport;
