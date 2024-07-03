import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { LoginForm } from "../../components/login/LoginForm";
import { Header } from "../../components/header/Header";

function LoginPage() {
   return (
      <div>
         <Header />
         <LoginForm />
      </div>
   );
}

export default LoginPage;
