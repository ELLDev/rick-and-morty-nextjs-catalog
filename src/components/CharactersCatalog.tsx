import Link from "next/link";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { Circle, MagnifyingGlass, XCircle } from "phosphor-react";

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

  const handleClearSearchBar = () => {
    setInputText("");
    searchName("");
  };

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
      <div className="m-8 rounded-lg xl:my-12 md:mx-[21vw] xl:mx-[28vw] 2xl:mx-[32vw]">
        <form
          onSubmit={(event: FormEvent) => event.preventDefault()}
          className="flex flex-1 md:justify-center relative"
        >
          <input
            className="pl-3 p-2 bg-slate-300 w-10/12 md:w-11/12 rounded-l-lg text-2xl md:text-4xl focus:border-[color:#08BAE3] focus:ring-[color:#08BAE3] focus:ring-2 focus:outline-none xl:focus:bg-slate-100 xl:ease-in-out xl:transition-all xl:hover:bg-slate-100 2xl:text-5xl"
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />

          <button className="group" disabled={inputText === ""} type="reset">
            <XCircle
              onClick={handleClearSearchBar}
              weight="bold"
              className="group-disabled:hidden absolute opacity-50 w-6 h-6 top-3 right-[calc(2.5rem+8.33%)] md:top-4 md:right-[calc(10.5vw+0.5rem)] xl:top-[0.875rem] xl:right-[calc(8vw+0.5rem)] xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 2xl:top-5 2xl:right-[calc(7vw+0.5rem)] hover:opacity-90"
              color="#000"
            />
          </button>

          <button
            className="w-2/12 md:w-2/12 bg-[color:#08BAE3] rounded-r-lg focus:border-zinc-800  focus:ring-zinc-800 focus:ring-2 focus:outline-none xl:hover:ease-in-out xl:transition-colors xl:hover:bg-[#3dcbeb]"
            type="submit"
            onClick={() => searchName(inputText)}
          >
            <MagnifyingGlass
              weight="bold"
              className="w-5 h-5 m-auto md:w-6 md:h-6 xl:h-7 xl:w-7 2xl:w-10 2xl:h-10"
              color="white"
            />
          </button>
        </form>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-8 md:justify-center md:p-0 xl:flex-wrap xl:flex-row xl:gap-20">
        {displayedMortyCharacters
          .slice(itemOffset, endOffset)
          .map((character) => (
            <div key={character.id} className="group">
              <Link href={`/character/${character.id}`}>
                <a className="bg-slate-400 rounded-3xl flex flex-1 flex-col md:flex-row drop-shadow-md md:mx-12 xl:flex-col xl:m-0 xl:drop-shadow-xl">
                  <div className="min-w-[300px] xl:w-[400px]">
                    <Image
                      src={character.image}
                      alt={character.name}
                      className="rounded-t-3xl md:rounded-none md:rounded-l-3xl xl:rounded-none xl:rounded-t-3xl saturate-125"
                      layout="responsive"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-4 md:p-0 flex flex-1 flex-col md:justify-center md:gap-2 md:mx-4 xl:m-0 xl:p-8">
                    <div className="">
                      <h2 className="tracking-wide text-4xl md:text-5xl font-black text-white font-Roboto underline underline-offset-1 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate xl:group-hover:text-orange-500 xl:group-hover:ease-in-out xl:transition-colors xl:max-w-[336px]">
                        {character.name}
                      </h2>

                      <div className="flex flex-1 items-center flex-row mt-0.5 md:mt-1">
                        <Circle
                          className="w-3 h-3 mr-1 md:w-4 md:h-4 md:mr-1.5"
                          color={
                            character.status === "Alive"
                              ? "#11f30d"
                              : character.status === "Dead"
                              ? "#ee1e1e"
                              : "#7e7e7e"
                          }
                          weight="fill"
                        />
                        <span className="text-white font-Roboto font-medium md:text-2xl capitalize">
                          {character.status} - {character.species}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg mt-2 md:text-2xl">
                        Origin:
                      </h5>
                      <p className="text-white font-Roboto text-xl tracking-wide md:text-2xl md:mt-1 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate first-letter:capitalize xl:max-w-[336px]">
                        {character.origin.name}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-slate-50 tracking-wide underline font-Roboto font-medium text-lg md:mt-2 md:text-2xl">
                        Location:
                      </h5>
                      <p className="text-white font-Roboto text-xl tracking-wide md:text-2xl md:mt-1 md:max-w-[calc(100vw-396px-16px)] md:whitespace-nowrap md:truncate first-letter:capitalize xl:max-w-[336px]">
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
