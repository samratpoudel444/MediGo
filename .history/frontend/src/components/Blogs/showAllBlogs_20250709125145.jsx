import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  Paper,
  Pagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getAllBlogs");
    
    return response.data.message;
  } catch (err) {
    throw err;
  }
};

const ShowAllBlogs = () => {
  const { data } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });
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
                <TableCell>S.N.</TableCell>
                <TableCell>Blog Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Status</TableCell>
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
                        src={`https://res.cloudinary.com/da9skf8ed/image/upload/v1752042148/blogs/p3wat0ouycbsitnxhg0z.png}`}
                        alt="blog"
                        className="w-16 h-16 object-cover"
                      />
                    </TableCell>
                    <TableCell>{value.author}</TableCell>
                    <TableCell>
                      <div>
                        <button></button>
                        <button></button>
                      </div>
                    </TableCell>{" "}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default ShowAllBlogs;
