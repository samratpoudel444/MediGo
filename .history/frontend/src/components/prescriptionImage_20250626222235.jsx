import prescriptionFormat from "../assets/prescription.png";

const PrescriptionImage = () => {
  return (
    <div>
      <h1>Standard Prescription Format</h1>

      <img
        className="border w-full flex "
        src={prescriptionFormat}
        alt="Prescription"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <a href={prescriptionFormat} download="prescription.png">
        <button>Download Image</button>
      </a>
    </div>
  );
};

export default PrescriptionImage;
