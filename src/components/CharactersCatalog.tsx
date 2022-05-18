import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Circle, MagnifyingGlass } from "phosphor-react";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  origin: { name: string };
  location: { name: string };
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
    setDisplayedMortyCharacters(allMortyCharacters);
    setMortyCharactersCount(allMortyCharacters.length);
    setPageCount(Math.ceil(allMortyCharacters.length / itemsPerPage));
  }, [allMortyCharacters, itemsPerPage, setMortyCharactersCount, setPageCount]);

  return (
    <>
      <div className="bg-slate-300 m-8 rounded-lg flex flex-1">
        <form onSubmit={(event: FormEvent) => event.preventDefault()}>
          <input
            className="pl-3 p-2 bg-slate-300 w-10/12 rounded-l-lg text-2xl focus:border-[color:#08BAE3] focus:ring-[color:#08BAE3] focus:ring-2 focus:outline-none"
            type="text"
            onChange={(event) => setInputText(event.target.value)}
          />

          <button
            className="w-2/12 h-full bg-[color:#08BAE3] rounded-r-lg focus:border-zinc-800  focus:ring-zinc-800 focus:ring-2 focus:outline-none"
            type="submit"
            onClick={() => searchName(inputText)}
          >
            <MagnifyingGlass
              weight="bold"
              className="w-5 h-5 m-auto"
              color="white"
            />
          </button>
        </form>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8">
        {displayedMortyCharacters
          .slice(itemOffset, endOffset)
          .map((character) => (
            <div key={character.id} className="">
              <Link href={`/character/${character.id}`}>
                <a
                  target="_blank"
                  className="bg-slate-400 rounded-3xl flex flex-1 flex-col drop-shadow-md"
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    className="rounded-t-3xl saturate-125"
                    layout="responsive"
                    width={300}
                    height={300}
                  />
                  <div className="p-4">
                    <h2 className="tracking-wide text-4xl font-black text-white font-Roboto underline underline-offset-1 lg:hover:text-orange-500">
                      {character.name}
                    </h2>

                    <div className="flex flex-1 items-center flex-row mt-0.5">
                        <Circle
                          className="w-3 h-3 mr-1"
                          color={character.status ==="Alive" ? "#11f30d" : "#ee1e1e"}
                          weight="fill"
                        />
                      <span className="text-white font-Roboto font-medium">
                        {character.status} - {character.species}
                      </span>
                    </div>

                    <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg mt-2">Origin:</h5>
                    <p className="text-white font-Roboto text-xl tracking-wide">{character.origin.name}</p>

                    <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg mt-2">Location:</h5>
                    <p className="text-white font-Roboto text-xl tracking-wide">{character.location.name}</p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
