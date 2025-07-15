import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Avatar,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchUserBlogs = async () => {
  const res = await axiosInstance.get("/api/v1/getBlogsOfSpecificUser");
  return res.data.message; 
};

const UserBlogsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUserBlogs,
  });

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center text-4xl font-bold ">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="h-full flex justify-center items-center text-4xl font-bold ">
        Data not found
      </div>
    );
  }

  // Defensive check
  const blogs = Array.isArray(data) ? data : [];

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell>
              <strong>Content</strong>
            </TableCell>
            <TableCell>
              <strong>Author</strong>
            </TableCell>
            <TableCell>
              <strong>Image</strong>
            </TableCell>
            <TableCell>
              <strong>Blog ID</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>
                  {blog.content.length > 50
                    ? `${blog.content.slice(0, 50)}...`
                    : blog.content}
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  <Avatar
                    alt={blog.title}
                    src={blog.picture}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{blog._id}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={blogs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default UserBlogsTable;
