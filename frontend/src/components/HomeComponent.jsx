import AppointmentSchedule from "./AppointmentSchedule";
import CardSection from "./CardSection";
import CardSectionCard from "./CardSectionCard";
import HealthCare from "./HealthCare";
import Navbar from "./Navbar";
import OurDoctors from "./OurDoctors";
import OurMedicalServices from "./OurMedicalServices";
import OurSpeciality from "./OurSpeciality";


const HomeComponent = () => {
  return (
    <div>
      <Navbar />
      <HealthCare />
      <CardSection />
      <OurMedicalServices />
      <OurSpeciality />
      <AppointmentSchedule />
      <OurDoctors />
    </div>
  );
};

export default HomeComponent;
