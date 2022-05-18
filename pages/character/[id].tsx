import Head from "next/head";
import Image from "next/image";
import { InferGetStaticPropsType } from "next";
import { api } from "../../src/services/api";

import styles from "./styles.module.css";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  origin: { name: string };
  location: { name: string };
}

interface CharactersId {
  id: number;
}

export async function getStaticPaths() {
  const charactersCount = await api
    .get("character")
    .then((response) => response.data.info.count);

  let charactersId = [] as CharactersId[];

  for (let i = 1; i <= charactersCount; i++) {
    charactersId[i] = { id: i };
  }

  return {
    paths: charactersId.map((character) => ({
      params: { id: character.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const data = await api
    .get(`character/${params.id}`)
    .then((response) => response.data as Character);

  return {
    props: {
      characterData: data,
    },
    // revalidate: 30,
  };
}

export default function CharacterDetails({
  characterData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{characterData.name}</title>
        <meta name="description" content="Character Description" />
      </Head>

      <div className={styles.characterDescription}>
        <Image
          src={characterData.image as string}
          alt={characterData.name as string}
          // layout="responsive"
          width={300}
          height={300}
        />
        <div className={styles.imageWrapper}>
          <span>Name: {characterData.name}</span>
          <span>Species: {characterData.species}</span>
          <span>Status: {characterData.status}</span>
        </div>
      </div>
    </>
  );
}
