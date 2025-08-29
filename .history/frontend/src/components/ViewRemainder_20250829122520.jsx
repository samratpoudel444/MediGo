import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./utils/AxiosInstance";
import "react-toastify/dist/ReactToastify.css";

// MUI imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ViewRemainder() {
  const [remainders, setRemainders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRemainders = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/listRemainder");
      console.l
      setRemainders(data.message.remainders || []);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching remainders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemainders();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold mb-4">All Medicine Remainders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : remainders.length === 0 ? (
          <p>No remainders found.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remainders.map((reminder, index) => (
                  <TableRow key={index}>
                    <TableCell>{reminder.Email}</TableCell>
                    <TableCell>{reminder.name}</TableCell>
                    <TableCell>{reminder.Title}</TableCell>
                    <TableCell>{reminder.Time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ViewRemainder;
