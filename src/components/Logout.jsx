import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoutSVG } from '../../assets/img/logout.svg'
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('userData');
    navigate('/login');
  };
  return (
    <button className="link" onClick={handleLogout}>
      <LogoutSVG className="icon" />
      <span className='text'>Logout</span>
    </button>
  )
};

export default Logout