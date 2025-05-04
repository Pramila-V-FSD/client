import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SuccessMessage from './components/SuccessMessage';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Routes>
              <Route path="/" element={<ForgotPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/success" element={<SuccessMessage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;