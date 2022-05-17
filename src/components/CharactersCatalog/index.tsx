import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";

interface Character {
  id: number;
  name: string;
  image: string;
  // gender: string;
  species: string;
  status: string;
}

interface CharactersCatalogProps {
  allMortyCharacters: Character[];
  itemsPerPage: number;
  itemOffset: number;
  setItemOffset: (itemOffset: number) => void;
  endOffset: number;
  setMortyCharactersCount: (mortyCharactersCount: number) => void;
  setPageCount: (pageCount: number) => void;
  setIsSearchNameActive: (isSearchNameActive: boolean) => void;
}

export default function CharactersCatalog({
  itemsPerPage,
  itemOffset,
  setItemOffset,
  endOffset,
  setMortyCharactersCount,
  setPageCount,
  allMortyCharacters,
  setIsSearchNameActive,
}: CharactersCatalogProps) {
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

    setDisplayedMortyCharacters(filteredMortyCharactersCopy);
    setPageCount(Math.ceil(filteredMortyCharactersCopy.length / itemsPerPage));
    setItemOffset(0);
    setMortyCharactersCount(filteredMortyCharactersCopy.length);
    filteredMortyCharactersCopy.length === allMortyCharacters.length
      ? setIsSearchNameActive(false)
      : setIsSearchNameActive(true);
  };

  useEffect(() => {
    // for (
    //   let character = 0;
    //   character < allMortyCharacters.length;
    //   character++
    // ) {

    //   router.push({
    //     pathname: `/character/1`,
    //     // pathname: `/character/${allMortyCharacters[character].id}`,
    //     query: { characterData: JSON.stringify(allMortyCharacters[character]) as string },
    //   });
    // }

    setDisplayedMortyCharacters(allMortyCharacters);
    setMortyCharactersCount(allMortyCharacters.length);
    setPageCount(Math.ceil(allMortyCharacters.length / itemsPerPage));
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
              <Link
                href={{
                  pathname: `/character/${character.id}`,
                  query: {
                    name: character.name,
                    image: character.image,
                    // gender: character.gender,
                    species: character.species,
                    status: character.status,
                  },
                }}
              >
                <a>
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
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
