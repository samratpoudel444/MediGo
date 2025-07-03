import AppointmentSchedule from "./AppointmentSchedule";
import CardSection from "./CardSection";
import CardSectionCard from "./CardSectionCard";
import ChatButton from "./ChatApp/ChatButton";
import Footer from "./Footer";
import HealthCare from "./HealthCare";
import Navbar from "./Navbar";
import NavImage from "./NavImage";
import OurDoctors from "./OurDoctors";
import OurMedicalServices from "./OurMedicalServices";
import OurSpeciality from "./OurSpeciality";


const HomeComponent = () => {
  return (
    <div>
      <Navbar />
      <NavImage />
      <HealthCare />
      <CardSection />
      <OurMedicalServices />
      <OurSpeciality />
      <AppointmentSchedule />
      ChatButton
      <OurDoctors />
      <Footer />
    </div>
  );
};

export default HomeComponent;
