import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Connetwithme() {
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 80,
      once: true,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCountAnimations();
          observer.disconnect(); // Only once
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const runCountAnimations = () => {
    const counters = document.querySelectorAll('.number span');

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ''), 10);
      const isPercent = counter.textContent.includes('%');
      let count = 0;
      const increment = Math.max(1, Math.floor(target / 100)); // slower speed

      const updateCount = () => {
        count += increment;
        if (count >= target) {
          counter.textContent = isPercent ? `${target}%` : `${target}+`;
        } else {
          counter.textContent = isPercent ? `${count}%` : `${count}+`;
          setTimeout(updateCount, 15); // Delay makes it smoother
        }
      };

      updateCount();
    });
  };

  return (
    <section className="connect_with_me_sec" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-md-3" data-aos="flip-up" data-aos-delay="100">
            <div className="numeber_text_wrapper">
              <div className="number">
                <span className="gradient-text">299+</span>
              </div>
              <div className="text">
                <p>Connect With Me</p>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
            <div className="numeber_text_wrapper">
              <div className="number">
                <span className="gradient-text">489+</span>
              </div>
              <div className="text">
                <p>Follow My Life</p>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-right" data-aos-delay="300">
            <div className="numeber_text_wrapper">
              <div className="number">
                <span className="gradient-text">900+</span>
              </div>
              <div className="text">
                <p>Follow Me</p>
              </div>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-left" data-aos-delay="400">
            <div className="numeber_text_wrapper">
              <div className="number">
                <span className="gradient-text">99%</span>
              </div>
              <div className="text">
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Connetwithme;
