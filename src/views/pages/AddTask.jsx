import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useTasks } from "../../features/hooks/useTasks";
import { useLoading } from "../../features/hooks/useLoading";
import { toast } from "react-toastify";

function AddTask() {
  const { addTask, loading } = useTasks();
  const { setLoading } = useLoading();
  const [selectedImage, setSelectedImage] = useState({
    previewImage: null,
    imageData: null,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      price: yup.string().required("Price is required"),
    }),
    onSubmit: async (values) => {
      if (!selectedImage.imageData) {
        toast.error("Please select an image");
        return;
      }

      setLoading(true);

      // values.image = selectedImage.imageData;
      values.image = selectedImage.previewImage;

      await addTask(values);

      formik.resetForm();
      setSelectedImage({
        previewImage: null,
        imageData: null,
      });
      setLoading(false);
    },
  });

  // Function to handle image selection
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    // Display selected image preview
    setSelectedImage({
      previewImage: URL.createObjectURL(imageFile),
      imageData: imageFile,
    });
  };

  // Function to handle image removal
  const removeImage = () => {
    setSelectedImage({
      previewImage: null,
      imageData: null,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="w-1/2 mx-auto bg-gray-900 mt-16 p-10 rounded-lg"
      >
        {/* Add file input for image selection */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Choose an image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {selectedImage.previewImage ? (
            <div className="relative">
              <img
                src={selectedImage.previewImage}
                alt="Selected"
                className="max-w-full h-auto mb-2"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white text-xs"
              >
                X
              </button>
            </div>
          ) : (
            <label
              htmlFor="image"
              className="cursor-pointer block bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 py-2 px-4 rounded-lg text-center"
            >
              Select Image
            </label>
          )}
        </div>

        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add Task
        </label>
        <input
          type="text"
          id="title"
          name="title"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Task"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.title && formik.touched.title ? (
          <p className="text-red-500 pt-2 text-xs ">{formik.errors.title}</p>
        ) : null}

        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.price && formik.touched.price ? (
          <p className="text-red-500 pt-2 text-xs ">{formik.errors.price}</p>
        ) : null}

        <label
          htmlFor="desc"
          className="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white"
        >
          Task Description
        </label>
        <textarea
          type="textarea"
          id="desc"
          name="description"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Task Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.errors.description && formik.touched.description ? (
          <p className="text-red-500 pt-2 text-xs ">
            {formik.errors.description}
          </p>
        ) : null}
        <div className=" w-full flex justify-center mt-5">
          <button
            className="bg-white rounded-lg w-[80%] h-12"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading......" : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
