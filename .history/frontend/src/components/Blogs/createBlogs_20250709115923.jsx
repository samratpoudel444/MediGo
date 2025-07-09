import {
  FormControl,
  Input,
  InputLabel,
  Button,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createBlog = async (data) => {
  try {
    const response = await axiosInstance.post("/api/v1/createBlog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const CreateBlogs = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      toast.success(data.message);
      se
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      console.log(url);
      setImageUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    mutation.mutate(data);
  };

  return (
    <div className="w-screen h-screen sm:w-full bg-gray-50">
      <div className=" w-full h-22 text-center flex justify-center items-center bg-gray-300">
        <span className="text-2xl sm:text-3xl font-bold">Create Blogs</span>
      </div>
      <div className="flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto shadow-sm mt-8">
        <span className="text-center text-xl sm:text-2xl font-bold">
          Writing Blog
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center mt-8 sm:mt-16 sm: ml-24 gap-3 w-full mb-8"
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="component-outlined">
              Enter Blog Title
            </InputLabel>
            <OutlinedInput
              id="title"
              className="w-[80%]"
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
            ></OutlinedInput>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="component-outlined">
              Enter Blog Content
            </InputLabel>
            <OutlinedInput
              id="content"
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
              }}
              multiline
              rows={6}
              className="w-[80%]"
            ></OutlinedInput>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel shrink htmlFor="image-upload">
              Blog Image
            </InputLabel>
            <OutlinedInput
              id="image"
              type="file"
              inputProps={{ accept: "image/*" }}
              notched
              onChange={handleFileChange}
              className="w-[80%]"
            ></OutlinedInput>
            {selectedFile && (
              <FormHelperText>
                Selected Image:{" "}
                {imageUrl && <img src={imageUrl} alt="" className="w-50" />}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="component-outlined">
              Enter Blog Author
            </InputLabel>
            <OutlinedInput
              id="author"
              onChange={(e) => {
                setFormData({ ...formData, author: e.target.value });
              }}
              className="w-[80%]"
            ></OutlinedInput>
          </FormControl>

          <Button variant="contained" type="submit">
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
