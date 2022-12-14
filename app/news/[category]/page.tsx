import { categories } from "../../../constants";
import fetchNews from "../../../lib/fetchNews";
import NewsList from "../../NewsList";

type Props = {
  params: { category: Category };
};

async function NewsCategory({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle text-center">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default NewsCategory;

// Next.js will prebuild the pages for all the categories to reduce wait time for users
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category,
  }));
}
