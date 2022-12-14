import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: Boolean
    ) => {
    const query = gql`
        query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
        ) {
          myQuery
            (
                access_key: $access_key
                categories: $categories
                countries: "us,gb,in,"
                sort: "published_desc"
                keywords: $keywords
            ) {
                data {
                  author
                  country
                  category
                  description
                  image
                  language
                  published_at
                  source
                  title
                  url
                }
                pagination {
                  count
                  offset
                  total
                  limit
                } 
            }
        }
    `;

    // Fetch function with Next.js 13 caching ...
    const response = await fetch("https://barradocorda.stepzen.net/api/foolhardy-jaguar/__graphql", {
        method: "POST",
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? {revalidate: 0} : {revalidate: 30},
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body : JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            }
        })
    });

    // console.log(
    //     "LOADING NEW DATA FROM API for category >>> ",
    //     category,
    //     keywords
    // );

    const newsResponse = await response.json();
    
    // Sort function by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery);

    // Return response
    return news;
}

export default fetchNews;
