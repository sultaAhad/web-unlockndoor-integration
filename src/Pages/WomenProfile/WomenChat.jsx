import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { innerpages1 } from "../../Constant/Index";
import ChatComponent from "../../Components/ChatComponent";

const WomenChat = () => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages1})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <>
      <Header />
      <section className="chat pt-5 mt-4 mb-4 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <ChatComponent type={"women"} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WomenChat;
