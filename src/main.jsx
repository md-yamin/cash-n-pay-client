import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './Routes/Routes';
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
