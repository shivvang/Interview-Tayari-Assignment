import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const aueryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={aueryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)