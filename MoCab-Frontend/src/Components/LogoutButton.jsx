import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/user/logout', {
        method: 'GET', // or 'POST', depending on your backend
        credentials: 'include', // important for cookies/session
      });

      // Optionally clear client-side data if needed

      navigate('/UserLogin'); // Redirect to login or home
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='text-2xl h-10 rounded-full px-2 mb-2 bg-white flex items-center justify-end cursor-'
    >
      <i className="ri-logout-box-r-line"></i>
    </button>
  );
}

export default LogoutButton