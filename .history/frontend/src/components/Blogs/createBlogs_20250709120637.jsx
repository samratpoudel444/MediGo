import {
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

const createBlog = async (data) => {
  const response = await axiosInstance.post("/api/v1/createBlog", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
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
      setFormData({ title: "", content: "", author: "", image: null });
      setSelectedFile(null);
      setImageUrl(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    if (selectedFile) data.append("image", selectedFile);
    mutation.mutate(data);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="w-full text-center bg-gray-300 py-4">
        <span className="text-3xl font-bold">Create Blogs</span>
      </div>

      <div className="flex flex-col items-center w-[90%] sm:w-[70%] lg:w-[50%] mx-auto mt-8 bg-white shadow p-8 rounded">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <FormControl fullWidth>
            <InputLabel>Enter Blog Title</InputLabel>
            <OutlinedInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </FormControl> <br /> br

          <FormControl fullWidth>
            <InputLabel>Enter Blog Content</InputLabel>
            <OutlinedInput
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              multiline
              rows={6}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel shrink>Blog Image</InputLabel>
            <OutlinedInput
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleFileChange}
            />
            {selectedFile && (
              <FormHelperText>
                Preview:{" "}
                <img src={imageUrl} alt="preview" className="w-40 mt-2" />
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Enter Blog Author</InputLabel>
            <OutlinedInput
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </FormControl>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={mutation.isPending}
            fullWidth
          >
            Upload
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
