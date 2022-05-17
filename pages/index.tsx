import { GetStaticProps } from "next";
import Head from "next/head";
import PaginatedItems from "../src/components/PaginatedItems";
import { api } from "../src/services/api";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
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
      </Head>

      <main>
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
  const pagesInBackEnd = 1;

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
