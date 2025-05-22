import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoginLogo from '../assets/register.png';
import Logo from '../assets/logo2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import IconInputEmail from './IconInputEmail';
import IconInputPass from './IconInputPass';

function IconButton({ children, onClick, text, iconColor, ...props }) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="text-lg text-stone-600 flex justify-center items-center gap-x-2 block w-1/2 py-3 border my-3 hover:text-white hover:bg-black cursor-pointer"
    >
      {children}
      <div className="font-semibold text-base text-gray-500 ">
        {text}
      </div>
    </button>
  );
}

function IconButtonGit({ children, onClick, text, iconColor, ...props }) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="text-lg text-stone-600 flex justify-center items-center gap-x-2 block w-1/2 py-3 border my-3 hover:text-white hover:bg-black cursor-pointer"
    >
      {children}
      <div className="font-semibold text-base text-gray-500 ">
        {text}
      </div>
    </button>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!logEmail || !logPassword) {
      alert('Please fill in all fields');
      return;
    }

    const data = {
      email: logEmail,
      password: logPassword,
    };

    try {
      const response = await fetch('http://localhost:8080/users/login/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Login failed!');
        return;
      }

      if (!result.token) {
        alert('Login failed: Check Email and Password');
        return;
      }

      console.log('Data being sent:', data);
      console.log('Data received:', result);
      localStorage.setItem('token', result.token);
      navigate('/profile');
      setLogEmail('');
      setLogPassword('');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="form-container overflow-hidden rounded-3xl justify-between flex shadow-xl w-7/12 max-w-screen-xl h-8/12 max-h-screen-xl">
          <div className="form-section w-1/2 px-10 py-8">
            <div className="logo-wrap">
              <img src={Logo} alt="Logo" className="w-30 h-auto " />
            </div>
            <h1 className="text-3xl font-semibold mt-6 opacity-80 text-natural-900">Login to your account</h1>
            <p className="text-blac opacity-60 mt-3">Select method to log in:</p>
            <div className="outh-btns flex gap-x-5 justify-between mt-5">
              <IconButton text="Google" iconColor="#fff">
                <FontAwesomeIcon icon={faGoogle} />
              </IconButton>
              <IconButtonGit text="Github" iconColor="#fff">
                <FontAwesomeIcon icon={faGithub} />
              </IconButtonGit>
            </div>
            <span className="block text-center opacity-60 mt-3 ">
              or continue with email
            </span>
            <IconInputEmail value={logEmail} onChange={(e) => setLogEmail(e.target.value)} placeholder="Email" type="text">
              <FontAwesomeIcon icon={faEnvelope} />
            </IconInputEmail>
            <IconInputPass placeholder="Password" type="password" value={logPassword} onChange={(e) => setLogPassword(e.target.value)}>
              <FontAwesomeIcon icon={faLock} />
            </IconInputPass>
            <div className="flex justify-between items-center mt-5">
              <div className="item">
                <input type="checkbox" />
                <span className="text-natural-500 pl-2">
                  Remember me
                </span>
              </div>
              <div>
                <a href="" className="text-blue-500">
                  Forget password?
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-center mt-4 text-natural-500 ">Don't have an account?</p>
              <a onClick={() => setShowSignup(true)} className="text-blue-500 mt-4 ml-1 cursor-pointer">
                Create an account
              </a>
            </div>
            <button className="border shadow w-full py-3 rounded mt-5 font-semibold text-xl hover:bg-black hover:text-white cursor-pointer">
              Login
            </button>
          </div>
          <div className="illustration-section w-1/2 bg-black">
            <div className="illu-wrap">
              <img src={LoginLogo} alt="Login picture" className="rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;