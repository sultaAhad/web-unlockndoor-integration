import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import Aos from "aos";
import {
	edit,
	notification,
	p3,
	profilebanner,
	profileimg,
	solar_calendar,
	uploader_icon,
	user,
	user_pro,
} from "../Constant/Index";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

function Editprofile() {
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [rangeValue, setRangeValue] = useState(50);
	const [chips, setChips] = useState(["Gaming", "Movies", "Sports"]);
	const [selectedOption, setSelectedOption] = useState(""); // Radio button state
	const [text, setText] = useState(""); // Textarea state

	// Handle chip addition
	const handleAddChip = (chip) => {
		if (chip && !chips.includes(chip)) {
			setChips([...chips, chip]);
		}
	};

	// Handle chip removal
	const handleRemoveChip = (chip) => {
		setChips(chips.filter((c) => c !== chip));
	};

	// Handle radio button change
	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	// Handle textarea input
	const handleChange = (event) => {
		setText(event.target.value);
	};
	useEffect(() => {
		Aos.init({ duration: 1000, once: true }); // Initialize AOS with options
	}, []);
	return (
		<>
			<Header />

			<section className="profile_sec pt-5 pb-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img">
								<img src={profilebanner} className="img-fluid banner_img" />
								<div className="profile_img_div">
									<img src={profileimg} className="img-fluid profile_imgg" />
									<h5>tina smith</h5>
								</div>

								{/* <div className="account_access_dv">
                  <div className="create_btn">
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="border"
                    >
                      Create a new Bid request{' '}
                    </button>
                  </div>

                  <div className="notify_edit_dv">
                    <ul>
                      
                      <Link to="/notifications">
                        {' '}
                        <li>
                          <img src={notification} />
                        </li>
                      </Link>
                      <Link to="/women-settings">
                        <li>
                          <img src={edit} />
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ============================== */}

			<div className="register_sec py-5">
				<div className="container">
					<div className="profile_dv">
						<div className="row">
							<div className="col-md-12">
								<div className="edit-profile-form">
									<div className="form-container">
										{/* <div className="custom-slider-section">
                      <label className="slider-title">
                        How Much Can She Pay?
                      </label>
                      <div className="slider-wrapper">
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="10"
                          value={rangeValue}
                          onChange={(e) =>
                            setRangeValue(Number(e.target.value))
                          }
                          className="custom-slider"
                        />
                        <div
                          className="slider-value"
                          style={{ left: `${((rangeValue - 10) / 90) * 100}%` }}
                        >
                          {rangeValue === 100 ? '100k+' : `${rangeValue}k`}
                        </div>
                      </div>
                      <div className="slider-labels">
                        <span>10k</span>
                        <span>50k</span>
                        <span>100k+</span>
                      </div>
                    </div> */}
										<form>
											<div className="row form_control_all">
												<div className="col-md-4">
													<div className="form-group upload-section">
														<label>Upload 5 pictures minimum</label>
														<div className="uploader py-3 rounded">
															<div className="upload_pic d-flex justify-content-center align-items-center text-center">
																<div className="content_uploader">
																	<img
																		src={uploader_icon}
																		alt=""
																		className="img-fluid"
																	/>
																	<p className="">Upload here</p>
																</div>
															</div>

															<input type="file" className="uploader_file" />
														</div>
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group upload-section">
														<label>Upload 5 pictures minimum</label>
														<div className="uploader py-3 rounded">
															<div className="upload_pic d-flex justify-content-center align-items-center text-center">
																<div className="content_uploader">
																	<img
																		src={uploader_icon}
																		alt=""
																		className="img-fluid"
																	/>
																	<p className="">Upload here</p>
																</div>
															</div>

															<input type="file" className="uploader_file" />
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<label></label>

													<div className="form-group mb-4">
														<input type="text" placeholder="height" required />
													</div>

													{/* Dropdowns */}
													{["nationality"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													<div className="form-group upload-section">
														<p className="">
															Note :make sure you got the best of your
															attractiveness and qualities
														</p>
													</div>
												</div>

												<div className="col-md-4"></div>
												<div className="col-md-4"></div>
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Your Name"
															required
														/>
													</div>
												</div>
												<div className="col-md-4">
													{/* <div className="date_wrapper">
                          <div className="form-group">
                            <input
                              type="date"
                              placeholder="Date Of Birth (DOB must match the ID given)"
                              required
                            />
                          </div>
                          </div> */}
													<div className="form-group position-relative">
														<DatePicker
															selected={dateOfBirth}
															onChange={(date) => setDateOfBirth(date)}
															placeholderText="Date Of Birth (DOB must match the ID given)"
															dateFormat="dd/MM/yyyy"
															className="custom_datePicker"
														/>
														<div className="input_icons">
															<img src={solar_calendar} alt="" />
														</div>
													</div>
												</div>
												<div className="col-md-4">
													{/* <div className="form-group">
                            <input
                              type="text"
                              placeholder="'Body Type?"
                              required
                            />
                          </div> */}
													{/* Dropdowns */}
													{["Body Type?"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													{/* Dropdowns */}
													{/* <div className="form-group">
                            <input
                              type="text"
                              placeholder="'Hair Color"
                              required
                            />
                          </div> */}
													{["Hair Color"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													{/* Dropdowns */}
													{/* <div className="form-group">
                            <input
                              type="text"
                              placeholder="Eyes Color"
                              required
                            />
                          </div> */}
													{["Eyes Color"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="email"
															placeholder="body type"
															required
														/>
													</div>
												</div>
												<div className="col-md-4">
													{/* Dropdowns */}
													{["what are your talents and skills?"].map(
														(placeholder) => (
															<div className="form-group" key={placeholder}>
																<select required>
																	<option value="">{placeholder}</option>
																	<option value="Option 1">Option 1</option>
																	<option value="Option 2">Option 2</option>
																</select>
															</div>
														),
													)}
												</div>
												<div className="col-md-4">
													{/* Dropdowns */}
													{["What is your Profession?"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													{/* Dropdowns */}
													{["Realtionship Stattus"].map((placeholder) => (
														<div className="form-group" key={placeholder}>
															<select required>
																<option value="">{placeholder}</option>
																<option value="Option 1">Option 1</option>
																<option value="Option 2">Option 2</option>
															</select>
														</div>
													))}
												</div>
												<div className="col-md-4">
													{" "}
													<div className="form-group">
														{/* <label>What are your talents and skills?</label> */}
														<div className="chips">
															{chips.map((chip) => (
																<div key={chip} className="chip">
																	{chip}
																	<span onClick={() => handleRemoveChip(chip)}>
																		&times;
																	</span>
																</div>
															))}
														</div>
														{/* <input
                              type="text"
                              placeholder="Add skill"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  handleAddChip(e.target.value)
                                  e.target.value = ''
                                }
                              }}
                            /> */}
													</div>
												</div>
												<div className="col-md-4"></div>
												<div className="col-md-4">
													<Link to="/profile">
														{" "}
														<button type="submit" className=" border">
															Save
														</button>
													</Link>
												</div>
											</div>
											{/* Input Fields */}

											{/* Chips */}
											{/* <div className="form-group">
                        <label>What are your talents and skills?</label>
                        <div className="chips">
                          {chips.map((chip) => (
                            <div key={chip} className="chip">
                              {chip}
                              <span onClick={() => handleRemoveChip(chip)}>
                                &times;
                              </span>
                            </div>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Add skill"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddChip(e.target.value)
                              e.target.value = ''
                            }
                          }}
                        />
                      </div> */}
											{/* Upload */}

											{/* <div className="form-group upload-section">
                        <label>introduction video at least 2</label>
                        <div className="uploader py-3 rounded">
                          <div className="upload_pic d-flex justify-content-center align-items-center text-center">
                            <div className="content_uploader">
                              <img
                                src={uploader_icon}
                                alt=""
                                className="img-fluid"
                              />
                              <p className="">Upload here</p>
                            </div>
                          </div>

                          <input type="file" className="uploader_file" />
                        </div>
                        <p className="">Note :Explain yourself as a person</p>
                      </div> */}
											{/* Submit */}
											{/* <button type="submit" className="submit-btn">
                        submit
                      </button> */}
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Editprofile;

// import Aos from 'aos'
// import React, { useEffect, useState } from 'react'
// import {
//   edit,
//   men_img,
//   men_profile,
//   notification,
//   uploader_icon,
// } from '../../Constant/Index'
// import Header from '../../Components/Header/Header'
// import Footer from '../../Components/Footer'
// import { Link } from 'react-router-dom'

// function Meneditprofile() {
//   const [dateOfBirth, setDateOfBirth] = useState(new Date())
//   const [rangeValue, setRangeValue] = useState(50)
//   const [chips, setChips] = useState(['Gaming', 'Movies', 'Sports'])
//   const [selectedOption, setSelectedOption] = useState('') // Radio button state
//   const [text, setText] = useState('') // Textarea state

//   // Handle chip addition
//   const handleAddChip = (chip) => {
//     if (chip && !chips.includes(chip)) {
//       setChips([...chips, chip])
//     }
//   }

//   // Handle chip removal
//   const handleRemoveChip = (chip) => {
//     setChips(chips.filter((c) => c !== chip))
//   }

//   // Handle radio button change
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value)
//   }

//   // Handle textarea input
//   const handleChange = (event) => {
//     setText(event.target.value)
//   }
//   useEffect(() => {
//     Aos.init({ duration: 1000, once: true }) // Initialize AOS with options
//   }, [])
//   return (
//     <>
//       <Header />

//       <section className="profile_sec pt-5 pb-5" data-aos="fade-up">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12 pb-5">
//               <div className="profile_banner_img">
//                 <img src={men_img} className="img-fluid banner_img" />
//                 <div className="profile_img_div">
//                   <img src={men_profile} className="img-fluid profile_imgg" />
//                   <h5>John Smith</h5>
//                 </div>

//                 <div className="account_access_dv">
//                   <div className="notify_edit_dv">
//                     <ul>
//                       <Link to="/men-profile">
//                         {' '}
//                         <li>
//                           {/* <img src={notification} /> */}
//                           <i style={{
//                             color:"#fff"
//                           }} className="fa fa-arrow-left" aria-hidden="true"></i>
//                         </li>
//                       </Link>
//                       <Link to="/men-notifications">
//                         {' '}
//                         <li>
//                           <img src={notification} />
//                         </li>
//                       </Link>
//                       <Link to="/men-settings">
//                         <li>
//                           <img src={edit} />
//                         </li>
//                       </Link>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ============================== */}

//       <div className="register_sec py-5 pb-5">
//         <div className="container">
//           <div className="profile_dv">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="edit-profile-form">
//                   <div className="form-container">
//                     {/* <div className="custom-slider-section">
//                 <label className="slider-title">
//                   How Much Can She Pay?
//                 </label>
//                 <div className="slider-wrapper">
//                   <input
//                     type="range"
//                     min="10"
//                     max="100"
//                     step="10"
//                     value={rangeValue}
//                     onChange={(e) =>
//                       setRangeValue(Number(e.target.value))
//                     }
//                     className="custom-slider"
//                   />
//                   <div
//                     className="slider-value"
//                     style={{ left: `${((rangeValue - 10) / 90) * 100}%` }}
//                   >
//                     {rangeValue === 100 ? '100k+' : `${rangeValue}k`}
//                   </div>
//                 </div>
//                 <div className="slider-labels">
//                   <span>10k</span>
//                   <span>50k</span>
//                   <span>100k+</span>
//                 </div>
//               </div> */}
//                     <form>
//                       <div className="row form_control_all">
//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               type="text"
//                               placeholder="Your Name"
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-4">
//                           <div className="date_wrapper">
//                           <div className="form-group">
//                             <input
//                               type="date"
//                               placeholder="Date Of Birth (DOB must match the ID given)"
//                               required
//                             />
//                           </div>
//                           </div>
//                         </div>
//                         <div className="col-md-4">
//                           {/* Dropdowns */}
//                           <div className="form-group mb-4">
//                             <input type="text" placeholder="height" required />
//                           </div>
//                         </div>

//                         <div className="col-md-4">
//                           {/* Dropdowns */}
//                           <div className="form-group">
//                             <input
//                               type="text"
//                               placeholder="Hair Color"
//                               required
//                             />
//                           </div>
//                           {/* {['Hair Color'].map((placeholder) => (
//                             <div className="form-group" key={placeholder}>
//                               <select required>
//                                 <option value="">{placeholder}</option>
//                                 <option value="Option 1">Option 1</option>
//                                 <option value="Option 2">Option 2</option>
//                               </select>
//                             </div>
//                           ))} */}
//                         </div>
//                         <div className="col-md-4">
//                           {/* Dropdowns */}
//                           <div className="form-group">
//                             <input
//                               type="text"
//                               placeholder="Eyes Color"
//                               required
//                             />
//                           </div>
//                           {/* {['Eyes Color'].map((placeholder) => (
//                             <div className="form-group" key={placeholder}>
//                               <select required>
//                                 <option value="">{placeholder}</option>
//                                 <option value="Option 1">Option 1</option>
//                                 <option value="Option 2">Option 2</option>
//                               </select>
//                             </div>
//                           ))} */}
//                         </div>
//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               type="email"
//                               placeholder="Profession"
//                               required
//                             />
//                           </div>
//                         </div>

//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               type="email"
//                               placeholder="Purpose"
//                               required
//                             />
//                           </div>
//                         </div>

//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               type="email"
//                               placeholder="Annual Income"
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-4">
//                           {/* Dropdowns */}
//                           {['what are your talents and skills?'].map(
//                             (placeholder) => (
//                               <div className="form-group" key={placeholder}>
//                                 <select required>
//                                   <option value="">{placeholder}</option>
//                                   <option value="Option 1">Option 1</option>
//                                   <option value="Option 2">Option 2</option>
//                                 </select>
//                               </div>
//                             ),
//                           )}
//                         </div>

//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               type="email"
//                               placeholder="Stage Of Relationship"
//                               required
//                             />
//                           </div>
//                           {/* Radio Buttons */}
//                           <div className="form-option my-2">
//                             <label>
//                               <input
//                                 type="radio"
//                                 value="option1"
//                                 checked={selectedOption === 'option1'}
//                                 onChange={handleOptionChange}
//                                 className="form-check-input "
//                               />
//                               <span
//                                 style={{
//                                   opacity: '0.2',
//                                 }}
//                                 className="ms-2"
//                               >
//                                 {' '}
//                                 Beginning of relationship
//                               </span>
//                             </label>
//                           </div>
//                           <div className="form-option my-2">
//                             <label>
//                               <input
//                                 type="radio"
//                                 value="option2"
//                                 checked={selectedOption === 'option2'}
//                                 onChange={handleOptionChange}
//                                 className="form-check-input "
//                               />
//                               <span
//                                 style={{
//                                   opacity: '0.2',
//                                 }}
//                                 className="ms-2"
//                               >
//                                 {' '}
//                                 Already in communication
//                               </span>
//                             </label>
//                           </div>
//                           <div className="form-option my-2">
//                             <label>
//                               <input
//                                 type="radio"
//                                 value="option3"
//                                 checked={selectedOption === 'option3'}
//                                 onChange={handleOptionChange}
//                                 className="form-check-input "
//                               />
//                               <span
//                                 style={{
//                                   opacity: '0.2',
//                                 }}
//                                 className="ms-2"
//                               >
//                                 {' '}
//                                 Actual Meeting
//                               </span>
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-md-4">
//                           <div className="form-group">
//                             <input
//                               style={{
//                                 paddingBottom: '80px',
//                               }}
//                               type="text"
//                               placeholder="Message"
//                               required
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-4">
//                           {' '}
//                           <div className="form-group">
//                             {/* <label>What are your talents and skills?</label> */}
//                             <div className="chips">
//                               {chips.map((chip) => (
//                                 <div key={chip} className="chip">
//                                   {chip}
//                                   <span onClick={() => handleRemoveChip(chip)}>
//                                     &times;
//                                   </span>
//                                 </div>
//                               ))}
//                             </div>
//                             {/* <input
//                         type="text"
//                         placeholder="Add skill"
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter') {
//                             e.preventDefault()
//                             handleAddChip(e.target.value)
//                             e.target.value = ''
//                           }
//                         }}
//                       /> */}
//                           </div>
//                         </div>

//                         <div className="col-md-4"></div>
//                         <div className="col-md-4"></div>

//                         <div className="col-md-4 text-end">
//                           <button
//                             style={{
//                               width: '50%',
//                             }}
//                             type="submit"
//                             className=" border"
//                           >
//                             Save
//                           </button>
//                         </div>
//                       </div>
//                       {/* Input Fields */}

//                       {/* Chips */}
//                       {/* <div className="form-group">
//                   <label>What are your talents and skills?</label>
//                   <div className="chips">
//                     {chips.map((chip) => (
//                       <div key={chip} className="chip">
//                         {chip}
//                         <span onClick={() => handleRemoveChip(chip)}>
//                           &times;
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Add skill"
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {
//                         e.preventDefault()
//                         handleAddChip(e.target.value)
//                         e.target.value = ''
//                       }
//                     }}
//                   />
//                 </div> */}
//                       {/* Upload */}

//                       {/* <div className="form-group upload-section">
//                   <label>introduction video at least 2</label>
//                   <div className="uploader py-3 rounded">
//                     <div className="upload_pic d-flex justify-content-center align-items-center text-center">
//                       <div className="content_uploader">
//                         <img
//                           src={uploader_icon}
//                           alt=""
//                           className="img-fluid"
//                         />
//                         <p className="">Upload here</p>
//                       </div>
//                     </div>

//                     <input type="file" className="uploader_file" />
//                   </div>
//                   <p className="">Note :Explain yourself as a person</p>
//                 </div> */}
//                       {/* Submit */}
//                       {/* <button type="submit" className="submit-btn">
//                   submit
//                 </button> */}
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }

// export default Meneditprofile
