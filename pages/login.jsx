/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgLogIn } from "react-icons/cg";
import Alert from "../components/Alert";
import { LOGIN_USER } from "../gql/mutations";
import Loading from "../utils/Loading";
const Login = () => {
  const [formData, setFormData] = useState();
  const router = useRouter();
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    localStorage.setItem("user", data.login.user.username);
    router.push("/");
    router.reload();
    console.log("data", data);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      loginUser({
        variables: {
          input: formData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex justify-center">
              <CgLogIn className="text-4xl" />
            </div>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome back !!!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"> </p>
          </div>
          {error && (
            <>
              <Alert type="ERROR" message={error?.message} />
              {setTimeout(() => {
                loading = null;
              }, 2000)}
            </>
          )}
          {loading ? (
            <Loading />
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Enter User Name or Email address
                  </label>
                  <input
                    id="email-address"
                    name="identifier"
                    type="text"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter User Name or Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    onClick={() => alert("TODO")}
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
