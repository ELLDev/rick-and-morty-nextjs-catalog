import { GetStaticProps } from "next";
import Head from "next/head";
import PaginatedItems from "../src/components/PaginatedItems";
import { api } from "../src/services/api";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  origin: { name: string };
  location: { name: string };
}

interface HomeProps {
  allMortyCharacters: Character[];
}

export default function Home({ allMortyCharacters }: HomeProps) {
  return (
    <>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Rick and Morty Characters Catalog" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&family=Roboto:wght@500;700;900&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <h1 className="text-5xl text-[color:#08BAE3] font-black text-center p-4 font-Roboto drop-shadow-outlined">
          Rick and Morty Characters
        </h1>
        <PaginatedItems
          itemsPerPage={12}
          allMortyCharacters={allMortyCharacters}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  async function loadPageData(pageNumber: number) {
    const pageData = await api
      .get(`character/?page=${pageNumber}`)
      .then((response) => response.data.results as Character[]);

    return pageData;
  }

  // const pagesInBackEnd = await api
  //   .get("character")
  //   .then((response) => response.data.info.pages);
  const pagesInBackEnd = 10;

  let allMortyCharacters = [] as Character[];
  for (let pageIndex = 1; pageIndex <= pagesInBackEnd; pageIndex++) {
    await loadPageData(pageIndex).then((data) =>
      allMortyCharacters.push(...data)
    );
  }

  return {
    props: {
      allMortyCharacters,
    },
  };
};
