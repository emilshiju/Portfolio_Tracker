export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">
          404
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}
