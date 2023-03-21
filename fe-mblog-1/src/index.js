import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ImageUploader from './service/imageUploader';
import "bootstrap/dist/css/bootstrap.min.css";//있어야 navbar디자인 들어간다.
import "@fortawesome/fontawesome-free"

const imageUploader=new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
    <App imageUploader={imageUploader} />
  </BrowserRouter>
  </>
);
