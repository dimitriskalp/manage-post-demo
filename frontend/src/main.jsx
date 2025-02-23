import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import {PostProvider} from "./contexts/PostContextProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </ContextProvider>
  </StrictMode>,
)
