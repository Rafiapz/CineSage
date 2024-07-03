import { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import LoginPage from "./pages/auth/LoginPage";
import Layout from "./components/layout/Layout";
import DetailedView from "./components/detailedView/DetailedView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { Toaster } from "react-hot-toast";
import { fetchUser } from "./store/actions/userActions";
import AddMovie from "./components/addMovie/AddMovie";

function App() {
   const auth = useSelector((state: RootState) => state?.user?.auth?.status);
   const role = useSelector((state: RootState) => state?.user?.auth?.role);

   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(fetchUser());
   }, []);

   return (
      <>
         <Toaster position="top-center" containerClassName="text-red-500" />
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="/detailed" element={<DetailedView />} />
               <Route path="/add" element={<AddMovie />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<Layout />}>
               <Route index element={!auth ? <LoginPage /> : <Home />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
