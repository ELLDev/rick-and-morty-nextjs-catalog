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
      </Head>

      <main>
        <h1 className="bg-slate-700 text-5xl md:text-7xl xl:text-8xl text-[color:#08BAE3] font-black text-center p-4 md:py-6 xl:py-10 font-Roboto drop-shadow-outlined">
          <span className="drop-shadow-outlined">
            Rick and Morty Characters
          </span>
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
