export const CreateBlogs= async (req, res, next)=>
{
    try{
         const { title, content, author } = req.body;

         if (!title || !content || !author) {
           return res.status(400).json({ message: "All fields are required" });
         }

         let imageUrl = null;

         if (req.file) {
           const result = await cloudinary.uploader.upload_stream(
             {
               folder: "blogs",
               resource_type: "image",
             },
             (error, result) => {
               if (error) {
                 return next({
                   code: 500,
                   message: "Cloudinary upload failed",
                 });
               }

               imageUrl = result.secure_url;

               return res.status(201).json({
                 message: "Blog created successfully",
                 data: {
                   title,
                   content,
                   author,
                   imageUrl,
                 },
               });
             }
           );


           req.file.stream.pipe(result);
         } else {
           return res.status(400).json({ message: "Image file is required" });
         }
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500, message:err.message ||"Internal Server Error" })
    }
}