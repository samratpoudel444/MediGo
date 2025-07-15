import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import DeleteBlogModal from "../modal/deleteBlogModal";

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

  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
      console.log("the respone is", data);

  const handleClose = () => {
    setDeleteModal(false);
    setSelectedBlog(null);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Defensive check: if no data, show nothing or message
  const blogs = Array.isArray(data) ? data : [];

  return (
    <div>
      <div className="h-22 bg-gray-300 text-4xl font-bold flex justify-center items-center ">
        Blogs
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
                        <button className="rounded-xl bg-green-500 px-2 py-2 hover:bg-green-700">
                          Update
                        </button>
                        <button
                          className="rounded-xl bg-red-600 px-2 py-2 hover:bg-red-700"
                          onClick={() => {
                            setSelectedBlog(value);
                            setDeleteModal(true);
                            // Removed onClose() call here (was undefined)
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
