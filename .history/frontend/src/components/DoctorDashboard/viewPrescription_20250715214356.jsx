import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

const ViewPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prescription by ID
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getPrescriptionById/${id}`
      );
      setPrescription(response.data.message); // Adjust based on your API structure
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to load prescription");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>

      {prescription?.images && prescription.images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescription.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Prescription ${index + 1}`}
              className="w-full max-h-[400px] object-contain border border-gray-300 rounded-md shadow"
            />
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
