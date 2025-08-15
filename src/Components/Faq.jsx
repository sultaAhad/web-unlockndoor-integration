import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Import motion and useInView
import { faqimg } from "../Constant/Index";
import { useInView } from "react-intersection-observer";
import Aos from "aos";

function Faq() {
	// Hook to check if the section is in view
	const [inViewRef, inView] = useInView({
		triggerOnce: true, // Trigger animation only once
		threshold: 0.1, // Trigger animation when 10% of the section is in view
	});

	useEffect(() => {
		// Initialize AOS for other animations
		Aos.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			offset: 120,
		});
	}, []);
	const faqData = [
		{
			question:
				"So… is this just for romance, or what kind of connections are people looking for here?",
			answer:
				"Not everyone’s after dinner dates and love songs. Most folks here are seeking mutual arrangements—think companionship, mentorship, lifestyle support, and sometimes, yeah, romance. It’s all about shared goals, not cookie-cutter relationships.",
		},
		{
			question: "Is it free, or do I have to drop some cash to really use it?",
			answer:
				"Creating a profile is totally free—you can browse and vibe-check all you want. But to message and connect? You’ll need a paid membership. Premium unlocks the real fun: more features, more control, and more visibility.",
		},
		{
			question: "What does “mutual arrangement” really mean?",
			answer:
				"It means two grown people agree on exactly what they want—upfront. Whether it’s emotional, practical, supportive, or something in between, it’s about clear expectations and no guessing games.",
		},
		{
			question: "How do you deal with fake profiles and shady vibes?",
			answer:
				"We take safety seriously. No spams, Photo verification, optional ID checks, smart monitoring, and an active moderation team help keep scammers out. Spot something sketchy? Hit that report button.",
		},
		{
			question: "Can I stay low-key and control who sees me?",
			answer:
				"Absolutely. With a premium account, you get stealth mode, custom visibility settings, and inbox filters. You decide who gets access to your digital glow-up. It's confidential, exclusive and private.",
		},
		{
			question:
				"Can I meet someone IRL (In Real Life) right away, or should I take my time?",
			answer:
				"Totally your call—but we suggest chatting here first. Build trust, vibe it out. IRL (In Real Life) meetings are cool only when you’re ready, not when someone’s rushing you (on your time).",
		},
		{
			question: "How do I keep it safe when chatting with new people?",
			answer:
				"Keep convos on-platform at first. Don’t hand out your digits, address, or banking info. Trust your gut—and meet in public if you go offline. Oh, and block/report anyone sketchy.",
		},
		{
			question: "Can I cancel anytime? And refunds—yay or nay?",
			answer:
				"You can cancel whenever, but refunds? Usually a nay (unless legally required). Always read the fine print and cancel before your next billing cycle if you’re planning to do so.",
		},
		{
			question: "What should I put in my profile to attract the right energy?",
			answer:
				"Be bold. Be honest. Say exactly what you’re looking for—and what you bring to the table. Use recent photos, keep your vibe respectful and direct, and skip the vague lines. Clarity = confidence.",
		},
		{
			question: "Is this just for one country, or can I connect worldwide?",
			answer:
				"We’re global, baby. Search local or long-distance, set your filters, and find your people—wherever they are.",
		},
	];

	return (
		<section className="our_faq_sec" ref={inViewRef}>
			<motion.div
				className="container"
				initial={{ opacity: 0, y: 50 }} // Start slightly below and transparent
				animate={{
					opacity: inView ? 1 : 0, // Fade in
					y: inView ? 0 : 50, // Slide up as it enters
					scale: inView ? 1 : 0.9, // Scale up smoothly
				}}
				transition={{ duration: 0.8, ease: "easeOut" }} // Smooth animation
			>
				<div className="row">
					{/* Left Image Section */}
					<motion.div
						className="col-md-6"
						data-aos="fade-right"
						initial={{ opacity: 0, x: -100 }} // Start from the left with opacity 0
						animate={{
							opacity: inView ? 1 : 0, // Fade in
							x: inView ? 0 : -100, // Slide in from left
						}}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="img_wrapper">
							<img src={faqimg} alt="FAQ illustration" />
						</div>
					</motion.div>

					{/* Right FAQ Section */}
					<motion.div
						className="col-md-6 for_back_color"
						data-aos="fade-left"
						initial={{ opacity: 0, x: 100 }} // Start from the right with opacity 0
						animate={{
							opacity: inView ? 1 : 0, // Fade in
							x: inView ? 0 : 100, // Slide in from right
						}}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="faq_wrapper">
							{/* FAQ Header */}
							<motion.div
								className="faq_heading"
								data-aos="fade-up"
								initial={{ opacity: 0, y: 50 }} // Start below
								animate={{
									opacity: inView ? 1 : 0, // Fade in
									y: inView ? 0 : 50, // Slide up
								}}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<h3>Real Questions. Straight-Up Answers.</h3>
								<p>
									No fluff, no filters—just the stuff people actually want to
									know.{" "}
								</p>
							</motion.div>

							{/* Accordion Section */}
							<motion.div
								className="accordion"
								id="accordionExample"
								data-aos="fade-up"
								initial={{ opacity: 0, y: 50 }} // Start below
								animate={{
									opacity: inView ? 1 : 0, // Fade in
									y: inView ? 0 : 50, // Slide up
								}}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								{faqData.map((item, index) => (
									<div className="accordion-item" key={index}>
										<h2 className="accordion-header" id={`heading${index}`}>
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target={`#collapse${index}`}
												aria-expanded="false"
												aria-controls={`collapse${index}`}
											>
												{item.question}
											</button>
										</h2>
										<div
											id={`collapse${index}`}
											className={`accordion-collapse collapse ${
												index === 0 ? "show" : ""
											}`}
											aria-labelledby={`heading${index}`}
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">{item.answer}</div>
										</div>
									</div>
								))}
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}

export default Faq;
