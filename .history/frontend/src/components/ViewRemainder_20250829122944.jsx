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
import { Button } from "@mui/material";

function ViewRemainder() {
  const [remainders, setRemainders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRemainders = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/listRemainder");
      console.log(data)
      setRemainders(data.message || []);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching remainders");
    } finally {
      setLoading(false);
    }
  };

    const deleteRemainder = async (id) => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/deleteRemainder/${id`);
      console.log(data)
      setRemainders(data.message || []);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching remainders");
    } finally {
      setLoading(false);
    }


  useEffect(() => {
    fetchRemainders();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow p-4 mt-10">
        <h2 className="text-5xl font-bold mb-4 text-center">All Medicine Remainders</h2>

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
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remainders.map((reminder, index) => (
                  <TableRow key={index}>
                    <TableCell>{reminder.Email}</TableCell>
                    <TableCell>{reminder.name}</TableCell>
                    <TableCell>{reminder.Title}</TableCell>
                    <TableCell>{reminder.Time}</TableCell>
                    <TableCell>{<Button> Delete </Button>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Footer/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ViewRemainder;
