import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./admin/dashboard";
import { AuthContext } from "./context/AuthContext";
import Home from "./home";
import Login from "./login";
import NotFound from "./not-found";
import ThankYouPage from "./ThankYouPage";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  console.log("currentUser", currentUser);

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  const ScrollTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <>
      <ScrollTop />
      <Toaster />
      <Routes>
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/" element={<Home />} />
        {/* ===========Admin authentication=========== */}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />

        {/* ===========admin routes=========== */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
