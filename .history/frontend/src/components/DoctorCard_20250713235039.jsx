import React from "react";
import samrat from "../assets/samrat.png";

const DoctorCard = ({img, name, }) => {
	return (
		<div className="bg-[#42cbf5] h-[85%] w-[20%] rounded-[20%] p-8 mr-18">
			<div className="h-[80%] bg-white rounded-[20%] flex items-center justify-center">
				<img
					src={img || samrat}
					alt="Doctor Samrat"
					className="w-full h-[120%] object-contain -translate-y-2"
				/>
			</div>
			<div className="flex flex-col items-center justify-center mt-4">
				<h3 className="w-fit h-[30px]  text-2xl text-white">{Samrat Poudel}</h3>
				<p className="text-white">Doctor Sahab!!</p>
			</div>
		</div>
	);
};

export default DoctorCard;
