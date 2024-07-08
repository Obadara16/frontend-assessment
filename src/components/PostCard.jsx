import { Button, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const truncateText = (text, maxWords) => {
    if (!text || typeof text !== 'string') {
      return ''; 
    }
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  return (
    <Card className="w-full mb-8 p-1">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        {truncateText(post.title || '', 10)}
      </h5>
      <p className="font-normal text-gray-700">
        {truncateText(post.body || '', 10)}
      </p>
      <Link to={`/posts/${post._id}`} className="text-blue-500">
        <Button className="theme">
          Read more
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Link>
    </Card>
  );
};

export default PostCard;
