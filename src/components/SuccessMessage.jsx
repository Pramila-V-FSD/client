import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <FaCheckCircle className="text-success mb-3" style={{ fontSize: '4rem' }} />
        <h2 className="card-title mb-3">Password Reset Successful!</h2>
        <p className="card-text">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;