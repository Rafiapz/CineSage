import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { addMovie } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import { movieSchema } from "../../schema/MovieSchema";

const AddMovie = () => {
   const [poster, setPoster] = useState<string>("");
   const [error, setError] = useState<string>("");
   const initialState = {
      title: "",
      description: "",
      duration: "",
      releaseDate: "",
      genres: "",
   };

   const navigate = useNavigate();

   const handleImageChange = (e: any) => {
      setError("");
      setPoster(e?.target?.files[0]);
   };
   const handleSubmit = async (values: any, { resetForm }: any) => {
      console.log(values);
      if (poster === "") {
         setError("Plese select an image");
         return;
      }
      const formData = new FormData();
      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("duration", values?.duration);
      formData.append("realeaseDate", values?.realeaseDate);
      formData.append("genres", values?.genres);
      formData.append("poster", poster);

      try {
         const response = await addMovie(formData);

         if (response?.data?.status === "ok") {
            toast.success("Successfully submitted");
            resetForm();
            navigate("/");
         }
      } catch (error) {
         toast.error("Failed to submit");
      }
   };

   return (
      <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded-lg shadow-xl">
         <h2 className="text-2xl font-bold mb-5 text-center">Add New Movie</h2>
         <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={movieSchema}>
            <Form>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                     <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                           Title
                        </label>
                        <Field
                           type="text"
                           id="title"
                           name="title"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage className="text-red-500" component="div" name="title" />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                           Description
                        </label>
                        <Field
                           as="textarea"
                           id="description"
                           name="description"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           rows="4"
                           required
                        />
                        <ErrorMessage className="text-red-500" component="div" name="description" />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
                           Duration (minutes)
                        </label>
                        <Field
                           type="number"
                           id="duration"
                           name="duration"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                        <ErrorMessage className="text-red-500" component="div" name="duration" />
                     </div>
                  </div>
                  <div>
                     <div className="mb-4">
                        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
                           Release Date
                        </label>
                        <Field
                           type="Date"
                           id="releaseDate"
                           name="releaseDate"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage className="text-red-500" component="div" name="releaseDate" />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="genres" className="block text-gray-700 font-bold mb-2">
                           Genres (comma-separated)
                        </label>
                        <Field
                           type="text"
                           id="genres"
                           name="genres"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                        <ErrorMessage className="text-red-500" component="div" name="genres" />
                     </div>
                     <div className="mb-4">
                        <label htmlFor="poster" className="block text-gray-700 font-bold mb-2">
                           Poster Image
                        </label>
                        <input
                           type="file"
                           id="poster"
                           name="poster"
                           onChange={handleImageChange}
                           accept="image/*"
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-red-500">{error}</p>
                     </div>
                  </div>
               </div>
               <div className="mt-6">
                  <button
                     type="submit"
                     className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     Add Movie
                  </button>
               </div>
            </Form>
         </Formik>
      </div>
   );
};

export default AddMovie;
