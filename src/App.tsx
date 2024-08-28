import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
// Import the QueryClient and QueryClientProvider from react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import { AuthProvider } from './components/AuthContextProvider';
import Login from './pages/Login';

const App: React.FC = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="login" element={<Login />} />

              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="courses" element={<Courses />} />
              <Route path="add-course" element={<CreateCourse />} />
              <Route path="edit-course/:id" element={<EditCourse />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
