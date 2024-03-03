import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
function AddTask() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="flex justify-center items-center h-full w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-gray-900 mt-16 p-10 rounded-lg"
      >
        <label
          htmlFor="add"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Add Task
        </label>
        <input
          type="text"
          id="add"
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
          htmlFor="add"
          className="block mb-2 text-sm mt-4 font-medium text-gray-900 dark:text-white"
        >
          Task Description
        </label>
        <textarea
          type="textarea"
          id="add"
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
          <button className="bg-white rounded-lg w-[60%] h-12" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
