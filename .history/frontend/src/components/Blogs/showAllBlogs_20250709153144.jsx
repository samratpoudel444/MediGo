import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  Pagination,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";
import { useState } from "react";
import DeleteBlogModal from "../modal/deleteBlogModal";


const getAllBlogs = async () => {

  try {
    const response = await axiosInstance.get("/api/v1/getAllBlogs");
    console.log("the datais ",response)
    return response.data.message;
  } catch (err) {
    throw err;
  }
};

const ShowAllBlogs = () => {
    const [deleteModal, setDeleteModal] = useState(false);
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
  return (
    <div>
      <div className="h-22 bg-gray-300 text-4xl font-bold flex justify-center items-center ">
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
                      <div className="flex gap-3 mr-0">
                        <button className="rounded-xl bg-green-500 px-2 py-2 hover:bg-green-700">
                          Update
                        </button>
                        <button className="rounded-xl bg-red-600 px-2 py-2 hover:bg-red-700"
                        onClick={()setDeleteModal(true)}>
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPage={10}></TablePagination>
        {deleteModal && (<DeleteBlogModal />)}
      </div>
    </div>
  );
};
export default ShowAllBlogs;
