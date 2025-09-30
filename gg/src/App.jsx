import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import Home from "./page/home";
import Products from "./page/products";
import ProductDetails from "./component/ProductDetails";
import SearchResults from "./component/SearchResults";
import CartPage from "./page/Cart";
import Eletronics from "./page/eletronics";
import Signup from "./page/signup";
import Signin from "./page/signin";
import Layout from "./component/Layout";

// Enhanced Error Boundary Component
function ErrorBoundary() {
  const error = useRouteError();

  // Check if it's a 404 error
  const is404 = error?.status === 404 || error?.statusText === "Not Found";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            {is404 ? (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {is404 ? "Page Not Found" : "Oops! Something went wrong"}
          </h1>
          <p className="text-gray-600 mb-6">
            {is404
              ? "The page you're looking for doesn't exist."
              : "There was an error loading this page. Please try again."}
          </p>

          {/* Show error details in development */}
          {import.meta.env.DEV && error && (
            <details className="text-left bg-gray-100 p-4 rounded-lg mb-4">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// Loading Component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, // 👈 wrap all pages
      errorElement: <ErrorBoundary />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/details/:id", element: <ProductDetails /> },
        { path: "/search", element: <SearchResults /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/electronics", element: <Eletronics /> },
        { path: "/signUp", element: <Signup /> },
        { path: "/signIn", element: <Signin /> },
        { path: "*", element: <ErrorBoundary /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
