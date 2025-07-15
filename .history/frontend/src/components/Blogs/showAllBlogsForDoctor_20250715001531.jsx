import React, { useState, useMemo } from "react";
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
  Typography,
  TablePagination,
  TableSortLabel,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchUserBlogs = async () => {
  try {
    const res = await axiosInstance.get("/api/v1/getBlogsOfSpecificUser");
    console.log("📦 Full response:", res);
    console.log("✅ Response data:", res.data);

    const blogs = res.data?.message;

    if (!Array.isArray(blogs)) {
      console.warn("⚠️ 'message' is not an array:", blogs);
      return [];
    }

    return blogs;
  } catch (error) {
    console.error("❌ Error fetching user blogs:", error);
    throw error;
  }
};

const UserBlogsTable = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUserBlogs,
  });

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    field: "title",
    direction: "asc",
  });

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.field === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  // Process data with sorting and pagination
  const processedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    // Create a copy to avoid mutating the original array
    let sortableData = [...data];

    // Sorting
    sortableData.sort((a, b) => {
      if (a[sortConfig.field] < b[sortConfig.field]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.field] > b[sortConfig.field]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Pagination
    return sortableData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [data, sortConfig, page, rowsPerPage]);

  if (isLoading) {
    return (
      <Box className="h-full flex justify-center items-center text-4xl font-bold">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="h-full flex flex-col justify-center items-center p-4">
        <Typography variant="h4" color="error" gutterBottom>
          Error loading data
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {error.message || "Unknown error occurred"}
        </Typography>
      </Box>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Box className="h-full flex justify-center items-center text-4xl font-bold">
        No blogs found
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 4, overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "title"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("title")}
                >
                  <strong>Title</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "content"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("content")}
                >
                  <strong>Content</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "author"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("author")}
                >
                  <strong>Author</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === "_id"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("_id")}
                >
                  <strong>Blog ID</strong>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedData.map((blog) => (
              <TableRow key={blog._id} hover>
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
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {blog._id}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginTop: 2 }}
      />
    </Box>
  );
};

export default UserBlogsTable;

