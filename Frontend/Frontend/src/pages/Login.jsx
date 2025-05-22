import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

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

export default IconButton;