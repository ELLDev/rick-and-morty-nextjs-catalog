import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../../../src/services/api";

import styles from "./styles.module.css";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
}

interface Info {
  pages: number;
  next: string;
  prev: string;
}

interface CatalogProps {
  info: Info;
  results: Character[];
}

interface PagesInCatalogProps {}

export default function CharactersCatalog() {
  const [mortyCharacters, setMortyCharacters] = useState<CatalogProps>();
  const [pagesInCatalog, setPagesInCatalog] = useState<PagesInCatalogProps[]>(
    []
  );

  async function loadCharacters(page?: string, pageNumber?: number) {
    const response = await api.get<CatalogProps>(
      pageNumber ? `character/?page=${pageNumber}` : page || "character"
    );
    setMortyCharacters(response.data);
    setPagesInCatalog(Array.from(Array(response.data.info.pages).keys()));
    console.log(response.data.info.next);
  }

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <>
      <div className={styles.cardContainer}>
        {mortyCharacters?.results.map((character) => (
          <div key={character.id} className={styles.card}>
            <Image
              src={character.image}
              alt={character.name}
              className={styles.avatar}
              layout="responsive"
              width={300}
              height={300}
            />
            <p>
              {character.name},{character.species},{character.status}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.paginationButtons}>
        <button
          onClick={() => {
            loadCharacters(mortyCharacters?.info.prev);
            console.log(mortyCharacters?.info);
            console.log(pagesInCatalog);
          }}
        >
          Back Button
        </button>

        {pagesInCatalog.map((pageNumber) => (
          <button
            key={pageNumber as number}
            onClick={() =>
              loadCharacters(undefined, (pageNumber as number) + 1)
            }
            className={styles.pageButton}
          >
            {(pageNumber as number) + 1}
          </button>
        ))}

        <button
          onClick={() => {
            loadCharacters(mortyCharacters?.info.next);
            console.log(mortyCharacters?.info);
          }}
        >
          Forward Button
        </button>
      </div>
    </>
  );
}
