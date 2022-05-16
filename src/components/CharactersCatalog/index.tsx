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

interface CharactersCatalogProps {
  itemsPerPage: number;
  itemOffset: number;
  endOffset: number;
  setMortyCharactersCount: (mortyCharactersCount: number) => void;
  setPageCount: (pageCount: number) => void;
}

export default function CharactersCatalog({
  itemsPerPage,
  itemOffset,
  endOffset,
  setMortyCharactersCount,
  setPageCount,
}: CharactersCatalogProps) {
  const [allMortyCharacters, setAllMortyCharacters] = useState<Character[]>([]);
  const [displayedMortyCharacters, setDisplayedMortyCharacters] = useState<
    Character[]
  >([]);
  const [inputText, setInputText] = useState("");

  const searchName = (name: string) => {
    let allMortyCharactersCopy = { ...allMortyCharacters };
    let length = allMortyCharacters.length || 0;
    let regex = new RegExp(name, "i");
    let filteredMortyCharactersCopy = [] as Character[];

    for (let index = 0; index < length; index++) {
      if (regex.test(allMortyCharactersCopy[index].name)) {
        filteredMortyCharactersCopy.push(allMortyCharactersCopy[index]);
      }
    }
    console.log(filteredMortyCharactersCopy);

    setDisplayedMortyCharacters(filteredMortyCharactersCopy);
    setPageCount(Math.ceil(filteredMortyCharactersCopy.length / itemsPerPage));
  };

  async function loadPageData(pageNumber: number) {
    const pageData = await api
      .get(`character/?page=${pageNumber}`)
      .then((response) => response.data.results as Character[]);

    return pageData;
  }

  useEffect(() => {
    async function loadAllCharacters() {
      const pages = await api
        .get("character")
        .then((response) => response.data.info.pages);

      let charactersData = [] as Character[];
      for (let index = 1; index <= pages; index++) {
        await loadPageData(index).then((data) => charactersData.push(...data));
      }
      setAllMortyCharacters(charactersData);
      setDisplayedMortyCharacters(charactersData);
      setMortyCharactersCount(charactersData.length);
      setPageCount(Math.ceil(charactersData.length / itemsPerPage));
    }

    loadAllCharacters();
  }, []);

  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          className={styles.searchBar}
        />

        <button
          onClick={() => {
            searchName(inputText);
          }}
        >
          Search
        </button>
      </div>

      <div className={styles.cardContainer}>
        {displayedMortyCharacters
          .slice(itemOffset, endOffset)
          .map((character) => (
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
    </>
  );
}
