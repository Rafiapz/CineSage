import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store.tsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <BrowserRouter>
      <React.StrictMode>
         <Provider store={store}>
            <GoogleOAuthProvider clientId="855944358734-umvmh7iitbhtas1fui8ln226v3640rih.apps.googleusercontent.com">
               <App />
            </GoogleOAuthProvider>
         </Provider>
      </React.StrictMode>
   </BrowserRouter>
);
