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
      <div className="m-8 md:mx-0 rounded-lg">
        <form
          onSubmit={(event: FormEvent) => event.preventDefault()}
          className="flex flex-1 md:justify-center"
        >
          <input
            className="pl-3 p-2 bg-slate-300 w-10/12 md:w-6/12 rounded-l-lg text-2xl md:text-4xl focus:border-[color:#08BAE3] focus:ring-[color:#08BAE3] focus:ring-2 focus:outline-none"
            type="text"
            onChange={(event) => setInputText(event.target.value)}
          />

          <button
            className="w-2/12 md:w-1/12 bg-[color:#08BAE3] rounded-r-lg focus:border-zinc-800  focus:ring-zinc-800 focus:ring-2 focus:outline-none"
            type="submit"
            onClick={() => searchName(inputText)}
          >
            <MagnifyingGlass
              weight="bold"
              className="w-5 h-5 m-auto md:w-6 md:h-6"
              color="white"
            />
          </button>
        </form>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8 md:justify-center md:p-0">
        {displayedMortyCharacters
          .slice(itemOffset, endOffset)
          .map((character) => (
            <div key={character.id} className="">
              <Link href={`/character/${character.id}`}>
                <a
                  target="_blank"
                  className="bg-slate-400 rounded-3xl flex flex-1 flex-col md:flex-row drop-shadow-md md:mx-12"
                >
                  <div className="min-w-[300px]">
                    <Image
                      src={character.image}
                      alt={character.name}
                      className="rounded-t-3xl md:rounded-none md:rounded-l-3xl saturate-125"
                      layout="responsive"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-4 md:p-0 flex flex-1 flex-col md:justify-center md:gap-2 md:mx-4">
                    <div>
                      <h2 className="tracking-wide text-4xl md:text-5xl font-black text-white font-Roboto underline underline-offset-1 lg:hover:text-orange-500 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate">
                        {character.name}
                      </h2>

                      <div className="flex flex-1 items-center flex-row mt-0.5 md:mt-1">
                        <Circle
                          className="w-3 h-3 mr-1 md:w-4 md:h-4"
                          color={
                            character.status === "Alive" ? "#11f30d" : "#ee1e1e"
                          }
                          weight="fill"
                        />
                        <span className="text-white font-Roboto font-medium md:text-2xl">
                          {character.status} - {character.species}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg mt-2 md:text-2xl">
                        Origin:
                      </h5>
                      <p className="text-white font-Roboto text-xl tracking-wide md:text-2xl md:mt-1 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate">
                        {character.origin.name}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg md:mt-2 md:text-2xl">
                        Location:
                      </h5>
                      <p className="text-white font-Roboto text-xl tracking-wide md:text-2xl md:mt-1 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate">
                        {character.location.name}
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
