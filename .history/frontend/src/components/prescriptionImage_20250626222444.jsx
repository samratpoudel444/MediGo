import prescriptionFormat from "../assets/prescription.png";

const PrescriptionImage = () => {
  return (
    <div className="flex flex-col ">
      <h1>Standard Prescription Format</h1>

      <img
        className="border w-2/3 flex "
        src={prescriptionFormat}
        alt="Prescription"
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <a href={prescriptionFormat} download="prescription.png">
        <button className="border rounded bg-sky-400">Download Image</button>
      </a>
    </div>
  );
};

export default PrescriptionImage;
