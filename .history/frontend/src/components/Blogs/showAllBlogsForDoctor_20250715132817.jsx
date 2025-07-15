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
import DeleteBlogModal from "../modal/deleteBlogModal";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getBlogsOfSpecificUser");
    return response.data.message;
  } catch (err) {
    throw err;
  }
};

const UserBlogsTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate(); // ✅ useNavigate hook

  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedBlog(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const blogs = Array.isArray(data) ? data : [];

  return (
    <div>
      {/* ✅ Back Button */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-300">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-center w-full -ml-16">
          Blogs
        </h1>
      </div>

      <div>
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
              {blogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow key={value._id || index}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
                        <button className="rounded-xl bg-green-500 px-2 py-2 hover:bg-green-700 text-white">
                          Update
                        </button>
                        <button
                          className="rounded-xl bg-red-600 px-2 py-2 hover:bg-red-700 text-white"
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

        <TablePagination
          component="div"
          count={blogs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />

        {deleteModal && (
          <DeleteBlogModal id={selectedBlog._id} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default UserBlogsTable;
