import { Routes, Route } from 'react-router-dom';
import './App.scss';

import DataTableWrapper from './components/Table/DataTable';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Blockchain } from './components/Blockchain';
import { Component404 } from './components/Component404';

import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<DataTableWrapper />}></Route>{' '}
          <Route path="/:blockchain" element={<Blockchain />} />
          <Route path="/:blockchain/*" element={<Component404 />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
