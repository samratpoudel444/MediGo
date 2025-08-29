import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteBlogModal from "../modal/deleteBlogModal";

const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getAllBlogs");
    return response.data.message;
  } catch (err) {
    throw err;
  }
};

const ShowAllBlogs = () => {
  const navigate = useNavigate(); // ⬅️ hook for navigation
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState("");

  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedBlog("");
  };

  return (
    <div>
      {/* Back Button */}
      <div className="p-4">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </div>

      {/* Title */}
      <div className="h-22 text-4xl font-bold flex justify-center items-center">
        Blogs
      </div>

      <div className="">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  S.N.
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Blog Title
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Author
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.isArray(data) &&
                data.map((value, index) => (
                  <TableRow key={value._id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{value.title}</TableCell>
                    <TableCell>
                      <img
                        src={value.picture}
                        alt="blog"
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{value.author}</TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        {/* <button className="rounded-xl bg-green-500 px-2 py-2 hover:bg-green-700">
                          Update
                        </button> */}
                        <button
                          className="rounded-xl bg-red-600 px-2 py-2 hover:bg-red-700"
                          onClick={() => {
                            setSelectedBlog(value);
                            setDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPage={10} />
        {deleteModal && (
          <DeleteBlogModal id={selectedBlog._id} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default ShowAllBlogs;
