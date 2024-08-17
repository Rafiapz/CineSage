import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../schema/LoginSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginAction } from "../../store/actions/userActions";

export const LoginForm = () => {
   const initialValues = {
      email: "",
      password: "",
   };

   const navigate = useNavigate();

   const dispatch = useDispatch<AppDispatch>();
   const handleSubmit = async (values: any) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      dispatch(loginAction(formData))
         .then((response: any) => {
            if (response?.payload?.status === "ok") {
               navigate("/admin");
            } else {
               toast.error(response?.payload?.message);
            }
         })
         .catch((err: any) => {
            console.log(err);
         });
   };

   return (
      <div className="min-h-full mt-16 flex items-center justify-center p-4">
         <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8">
               <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Log In</h2>
               <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                  <Form className="space-y-6">
                     <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                           Email
                        </label>
                        <Field
                           name="email"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                           required
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                     </div>
                     <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                           Password
                        </label>
                        <Field
                           name="password"
                           type="password"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <ErrorMessage name="password" className="text-red-500" component="div" />
                     </div>
                     <div>
                        <button
                           type="submit"
                           className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                           Sign In
                        </button>
                     </div>
                  </Form>
               </Formik>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-8">
               <p className="text-xs text-gray-600 text-center">
                  Don't have an account?{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                     Sign up
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
};
