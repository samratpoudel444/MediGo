import CardSectionCard from "./CardSectionCard";
import { motion } from "framer-motion";

const CardSection = () => {

	const data = [
    {
      title: "Book Appointment",
      description:
        "Easily book your doctor’s appointment anytime with instant confirmation.",
      buttonText: "Book an appointment",
	  link:"/add"
    },
    {
      title: "Digitalize Prescriptions",
      description:
        "Easily digitize prescriptions for faster, safer, and paperless healthcare.",
      buttonText: "Digitalize prescription",
    },
    {
      title: "Navigate Pharmacies",
      description:
        "Find nearby pharmacies quickly and get medicines delivered to you.",
      buttonText: "Find a pharmacy",
    },
  ];
	return (
		<div className="w-[98vw] mt-16 bg-gray-50 h-[450px] flex items-center justify-evenly">
			<motion.div
				className="h-[70%] w-[20%] bg-[#42cbf5] rounded-4xl shadow-lg flex items-center justify-center text-white text-xl font-semibold"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.98 }}
			>
				safasf
			</motion.div>
			{
				data.map((source,item )=>
				{
					return <CardSectionCard ket={item} title={source.title} description={source.description} buttonText={source.buttonText}/>
				})
			}
		</div>
	);
};

export default CardSection;
