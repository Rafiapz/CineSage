import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { loginWithGoogle, signOutAction } from "../../store/actions/userActions";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

export const Header = () => {
   const dispatch = useDispatch<AppDispatch>();
   const role = useSelector((state: RootState) => state?.user?.auth?.role);
   const data: any = useSelector((state: RootState) => state?.user?.auth?.data);
   const auth: boolean = useSelector((state: RootState) => state?.user?.auth?.status);

   const handleSignOut = () => {
      dispatch(signOutAction());
   };

   const handleGoogleLoginSuccess = (tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      dispatch(loginWithGoogle(accessToken)).then(() => {
         toast.success("Login success");
      });
   };

   const handleGoogleLoginError = (error: any) => {
      toast(error.message);
   };

   const googleAuth = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: handleGoogleLoginError });

   return (
      <Navbar fluid className="fixed top-0 left-0 z-30 w-full">
         <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
               {role === "admin" ? <Link to={"/admin"}>CineSage</Link> : <Link to={"/"}>CineSage</Link>}
            </span>
         </Navbar.Brand>
         <div className="flex md:order-2">
            <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={data?.profilePhoto} rounded />}>
               {auth ? (
                  <>
                     <Dropdown.Header>
                        <span className="block text-sm">{data?.fullName}</span>
                        <span className="block truncate text-sm font-medium">{data?.email}</span>
                     </Dropdown.Header>
                     <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                  </>
               ) : (
                  <Dropdown.Item onClick={() => googleAuth()}>login With google</Dropdown.Item>
               )}
            </Dropdown>
            <Navbar.Toggle />
         </div>
         <Navbar.Collapse className="text-white m">{role === "admin" && <Link to={"/add"}>Add Movie</Link>}</Navbar.Collapse>
      </Navbar>
   );
};
