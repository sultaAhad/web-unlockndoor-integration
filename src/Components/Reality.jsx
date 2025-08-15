import React from 'react'
import { motion } from 'framer-motion'
import Webslider from './Webslider'
import { boyimg } from '../Constant/Index'

function Reality() {
  return (
    <>
      <section className="reality_sec" id='realitysec'>
        <div className="container">
          <div className="row">
            {/* Left Column with animation */}
            <div className="col-md-6 p-0">
              <motion.div
                className="reality_head"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h5>Customer Feedback</h5>
                <h2>
                  <span className="gradient-text">Real Stories from People </span>{' '}
                </h2>
                <h2>Who Found What They Were Looking For</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Webslider />
              </motion.div>
            </div>

            {/* Right Column with animation */}
            <div className="col-md-6 p-0">
              <motion.div
                className="boy_img_wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img src={boyimg} alt="" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Reality
