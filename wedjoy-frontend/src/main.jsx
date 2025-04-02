import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    // <StrictMode>
      <BrowserRouter>
      <App/>
      </BrowserRouter>
    // </StrictMode>
  );
} else {
  console.error("Root element not found!");
}
