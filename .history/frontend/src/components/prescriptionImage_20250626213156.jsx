import {prescriptionFormat} from "../assets/prescription.png"

const  PrescriptionImageFormat= ()=>
{
        return (
          <div>
            <h1>Standard Prescription format</h1>
            <img src={prescriptionFormat} alt="prescription" />

            <a href={prescriptionFormat} download="prescription.png">
              <button>Download Image</button>
            </a>
          </div>
        );
}

export default PrescriptionImage;