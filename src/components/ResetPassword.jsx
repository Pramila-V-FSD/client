import { useState, useEffect } from 'react';
import { FaKey, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get('https://server-1-peby.onrender.com/api/auth/verify-reset-token', {
          params: { token, userId }
        });
        setIsTokenValid(true);
        setMessage(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired reset link');
        setIsTokenValid(false);
      }
    };

    if (token && userId) {
      verifyToken();
    } else {
      setError('Invalid reset link');
      setIsTokenValid(false);
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        userId,
        token,
        newPassword
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/success'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isTokenValid) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            <FaKey className="me-2" /> Reset Password
          </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <button 
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate('/forgot-password')}
          >
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">
          <FaKey className="me-2" /> Reset Password
        </h2>
        
        {message && (
          <div className="alert alert-success">{message}</div>
        )}
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
