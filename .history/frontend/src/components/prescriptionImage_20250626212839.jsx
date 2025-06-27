import {prescriptionFormat} from "../assets/prescription.png"

const  PrescriptionImage= ()=>
{
        return (
          <div>
            <h1>Standard Prescription format</h1>
            <img src={prescriptionFormat} alt="prescription" />
          </div>
        );
}

export default PrescriptionImage;