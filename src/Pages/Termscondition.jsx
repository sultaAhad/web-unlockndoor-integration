import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer'

function Termscondition() {
  return (
    <>
      <Header />

      {/* Term and Condition Section */}
      <section className="term_sec">
        <div className="container">
          <div className="terms_head">
            <h2 style={{ color: '#fff' }}>
              <span className="gradient-text">Terms & Conditions</span>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="terms_para" style={{ color: '#fff' }}>
                <h4 className="gradient-text">1. Agreement to Use</h4>
                <p>
                  By registering or using UnlockNthedoor, users agree to these Terms and Conditions,
                  including all community guidelines and safety rules.
                </p>

                <h4 className="gradient-text">2. Account Eligibility</h4>
                <ul>
                  <li>Must be at least 18 years old</li>
                  <li>Users must provide accurate, truthful information</li>
                  <li>One account per individual</li>
                  <li>No impersonation or use of stolen photos or identities</li>
                </ul>

                <h4 className="gradient-text">3. Platform Usage</h4>
                <p>Users must:</p>
                <ul>
                  <li>Communicate respectfully</li>
                  <li>Avoid harassment, solicitation, or offensive content</li>
                  <li>
                    Not use UnlockNthedoor for illegal services or promotion of escorting,
                    commercial sex, or exploitation
                  </li>
                </ul>

                <h4 className="gradient-text">4. Verification and Safety</h4>
                <p>
                  Users can opt for verification to show authenticity. UnlockNthedoor may suspend or
                  investigate accounts that appear fraudulent or violate the rules.
                </p>

                <h4 className="gradient-text">5. Paid Services</h4>
                <p>Paid features include premium filters, visibility, and message access.</p>
                <ul>
                  <li>Subscriptions are auto-renewed unless canceled</li>
                  <li>No refunds after the billing period starts</li>
                  <li>Payment is securely processed by third-party providers</li>
                </ul>

                <h4 className="gradient-text">6. Termination</h4>
                <p>
                  UnlockNthedoor may suspend or close accounts for violating policies. Suspended
                  accounts will not receive refunds for unused time.
                </p>

                <h4 className="gradient-text">7. Content Ownership</h4>
                <p>
                  Users retain ownership of their own content but grant UnlockNthedoor a license to
                  display it within the platform.
                </p>

                <h4 className="gradient-text">8. Limits of Liability</h4>
                <p>
                  UnlockNthedoor is not responsible for interactions between users. Use of the
                  service is at the user’s own risk. No guarantees are made about outcomes, matches,
                  or success.
                </p>

                <h4 className="gradient-text">9. Dispute Resolution</h4>
                <p>
                  Disputes should first be addressed through the support team. If unresolved, legal
                  action must follow the applicable local law.
                </p>

                <h4 className="gradient-text">10. Changes</h4>
                <p>
                  Terms may change. Updates will be posted, and continued use means acceptance of
                  those updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Termscondition
