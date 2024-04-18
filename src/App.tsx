import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubjectsPage from './components/SubjectsPage';
import TopicsPage from './components/TopicsPage';
import QuizPage from './components/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectsPage />}/>
        <Route path="/topics/:subjectId" element={<TopicsPage />}/>
        <Route path="/quiz/:topicId" element={<QuizPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
