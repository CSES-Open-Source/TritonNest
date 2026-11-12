import { Routes, Route } from 'react-router';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import ListingsPage from './features/listings/ListingsPage.jsx';
import MessagesPage from './features/messaging/MessagesPage.jsx';
import MatchingPage from './features/matching/MatchingPage.jsx';
import ProfilePage from './features/auth/ProfilePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="listings" element={<ListingsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="matches" element={<MatchingPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
