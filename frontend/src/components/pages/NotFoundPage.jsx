import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/">Return Home</Link>
    </div>
  );
}

export default NotFoundPage;
