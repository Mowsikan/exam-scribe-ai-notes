
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-gray-100 p-6">
            <FileQuestion className="h-16 w-16 text-brand-blue" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-xl text-gray-600">
          Oops! We couldn't find that page
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
