import{Table, TableContainer, TableBody, TableCell, TableHead, Paper, 
Pagination, TableRow} from"@mui/material";

const ShowAllBlogs= ()=>
{
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
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
}
export default ShowAllBlogs;