import React, { useState } from "react";
import Stepper from "../../Components/WomanRegistrationForm/Stepper";
import StepThree from "../../Components/WomanRegistrationForm/Stepthree";
import StepTwo from "../../Components/WomanRegistrationForm/StepTwo";
import StepOne from "../../Components/WomanRegistrationForm/StepOne";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header/Header";

const StepFormWomen = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    preference: "",
    sliderValue: 50,
    photo: null,
    video: null,
  });

  const next = () => setStep((prev) => Math.min(prev + 1, 3));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = () => {
    console.log("Final Data:", formData);
    alert("Form submitted!");
  };

  return (
    <>
      <Header />
      <section className="registration-man">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-12">
              <div className="min-h-screen bg-gradient-to-br from-[#150328] to-[#390837] text-white p-4">
                <div className="max-w-5xl mx-auto mt-10 bg-[#2d033b] rounded-xl shadow-xl p-6">
                  <Stepper currentStep={step} />
                  {/* <div className="mt-6">
                    {step === 1 && (
                      <StepOne
                        formData={formData}
                        setFormData={setFormData}
                        next={next}
                      />
                    )}
                    {step === 2 && (
                      <StepTwo
                        formData={formData}
                        setFormData={setFormData}
                        next={next}
                        back={back}
                      />
                    )}
                    {step === 3 && (
                      <StepThree
                        formData={formData}
                        setFormData={setFormData}
                        back={back}
                        handleSubmit={handleSubmit}
                      />
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StepFormWomen;
