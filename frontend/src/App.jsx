import "./App.css";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Outlet/Dashboard/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Document from "./components/Outlet/Document/Document";
import DocumentDetail from "./components/Outlet/Document/DocumentDetail";
import Chat from "./components/Outlet/Document/DocumentDetail/Chat";
import FlashcardStudyPage from "./components/Outlet/Document/DocumentDetail/Flashcards/FlashcardStudyPage";
import Flashcards from "./pages/Flashcards";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<Document />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/documents/:id" element={<DocumentDetail />} />
              <Route
                path="/flashcard-sets/:setId"
                element={<FlashcardStudyPage />}
              />
              {/* <Route path="/documents/:id/chat" element={<Chat />} /> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
