import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
// Import the QueryClient and QueryClientProvider from react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Router>
      <Routes>
        {/** Provide the client to your App  */}
        <QueryClientProvider client={queryClient}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="courses" element={<Courses />} />
          </Route>
        </QueryClientProvider>
      </Routes>
    </Router>
  );
};

export default App;
