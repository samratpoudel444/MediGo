import React from "react";
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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";


const fetchUserBlogs = async () => {
  const res = await axiosInstance.get(
    "/api/v1/getBlogsOfSpecificUser"
  );
  return res.data.message;
};

const UserBlogsTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUserBlogs,
  });

  if(!data)
  {
    return (
      <div className="h-full flex justify-center items-center text-4xl font-bold ">
        Data not found
      </div>
    );
  }

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
          {data.map((blog) => (
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
    </TableContainer>
  );
};

export default UserBlogsTable;
