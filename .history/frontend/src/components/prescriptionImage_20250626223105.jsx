import prescriptionFormat from "../assets/prescription.png";

const PrescriptionImage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center ite">
      <div>
        {" "}
        <h1 className="font-bold text-3xl">Standard Prescription Format</h1>
      </div>

      <div>
        <img
          className="border w-2/3 flex "
          src={prescriptionFormat}
          alt="Prescription"
          style={{ maxWidth: "52%", height: "auto" }}
        />
      </div>

      <div>
        <a href={prescriptionFormat} download="prescription.png">
          <button className="rounded bg-sky-400 px-3 py-2">Download Image</button>
        </a>
      </div>
    </div>
  );
};

export default PrescriptionImage;
