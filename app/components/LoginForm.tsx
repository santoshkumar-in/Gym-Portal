import Image from "next/image";
import logo from "../../public/images/logo.png";

const LoginForm: React.FC = () => {
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');

  //   const handleSignIn = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     console.log('Sign In button clicked', { username, password });
  //     // Handle sign-in logic here
  //   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-1/3">
        <div className="text-center">
          <Image src={logo} alt="Logo" className="mx-auto w-auto" />
        </div>
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Sign In
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your username"
                //value={username}
                //onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2 block w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your password"
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="w-full rounded-md px-4 py-2 text-whit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
