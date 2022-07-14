import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import Response from "../response.json";
import { useRouter } from "next/router";
import ImageResults from "../components/ImageResults";
import UltraJaguar from "../public/UltraJaguar.png";

export default function Search({ results }) {
  const router = useRouter();
  //check search type
  const searchType = router.query.searchType;
  switch (searchType) {
    case "image":
      var res = <ImageResults results={results} />;
      break;
    default:
      var res = <SearchResults results={results} />;
      break;
  }
  return (
    <div>
      <Head className="flex w-full p-6 items-center">
        <title>{router.query.term} - Search page</title>
      </Head>
      {/* Search Header */}
      <SearchHeader />
      {res}
    </div>
  );
}

export async function getServerSideProps(context) {
  const startIndex = context.query.start || "1";

  const mockData = true;
  // const data = mockData
  //   ? Response
  //   : await fetch(
  //       // `https://www.googleapis.com/customsearch/v1?key=${
  //       //   process.env.API_KEY
  //       // }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
  //       //   context.query.searchType && "&searchType=image"
  //       // }&start=${startIndex}`
  //       `http://localhost:8080/search/test`
  //     ).then((response) => response.json());
  //const data = Response;
  //get respone from localhost:8080/search/test
  // const data = await fetch(`http://localhost:8080/search/test`).then(
  //   (response) => response.json()
  // );
  const data = Response;
  console.log(data);

  //change to false to see 
  const mockData = false;
  const data = mockData
    ? Response
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${
          process.env.API_KEY
        }&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}${
          context.query.searchType && "&searchType=image"
        }&start=${startIndex}`
      ).then((response) => response.json());

  return {
    props: {
      results: data,
    },
  };
}
