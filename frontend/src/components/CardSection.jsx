import CardSectionCard from "./CardSectionCard";

const CardSection = () => {
  return (
    <div className="w-[98vw] mt-16 bg-gray-50 h-[450px] flex items-center justify-evenly">
      <div className="h-[70%] w-[20%] bg-[#42cbf5] rounded-4xl"></div>
      <CardSectionCard />
      <CardSectionCard />
      <CardSectionCard />
    </div>
  );
};

export default CardSection;
