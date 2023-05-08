"use client";

import { useRouter } from "next/navigation";

type Props = {
  article: Article;
};

function ReadMoreButton({ article }: Props) {
  const router = useRouter();
  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article?${queryString}`;
    router.push(url);
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-900 text-white h-10 rounded-b-lg dark:text-gray-900 hover:bg-blue-800"
    >
      Read More
    </button>
  );
}

export default ReadMoreButton;
