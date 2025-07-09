import{Table, TableContainer, TableBody, TableCell, TableHead, Paper, 
Pagination, TableRow} from"@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./utils/AxiosInstance";

const getAllBlogs= async()=>
{
    try{
        const response= await axiosInstance.get("");
        return response.data.message;
    }
    catch(err)
    {
        throw err;
    }
}



const ShowAllBlogs= ()=>
{
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
                {Array.isArray(data)(
                  data.map((value, index) =>
                     <TableRow key={item._id || index}>

                     </TableRow> <TableCell>{index+1}</TableCell>
                            <TableCell></TableCell>
            <TableCell></TableCell>
        <TableCell></TableCell>)
        </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}
export default ShowAllBlogs;