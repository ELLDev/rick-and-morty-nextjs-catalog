import Head from "next/head";
import Image from "next/image";
import { InferGetStaticPropsType } from "next";
import { api } from "../../src/services/api";
import Link from "next/link";
import { ArrowUDownRight, CaretLeft, CaretRight, Circle } from "phosphor-react";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
}

interface CharactersId {
  id: number;
}

interface Episode {
  id: number;
  name: string;
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
  const character = await api
    .get(`character/${params.id}`)
    .then((response) => response.data as Character);

  const episodeURL = character.episode[0];
  const locationURL = character.location.url;

  const episode = await api
    .get(episodeURL)
    .then((response) => response.data as Episode);

  const locationType = await api
    .get(locationURL)
    .then((response) => response.data.type as string);

  return {
    props: {
      character,
      episode,
      locationType: locationType ? locationType : "Unknown",
    },
    // revalidate: 60 * 60 * 24 * 15,
  };
}

export default function CharacterDetails({
  character,
  episode,
  locationType,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{character.name}</title>
        <meta name="description" content="Character Description" />
      </Head>

      <div className="min-h-screen bg-stone-900">
        <h1 className="font-Roboto font-bold tracking-wide text-center text-slate-200 text-5xl py-5 px-3 md:text-7xl md:py-6 lg:hidden">
          {character.name}
        </h1>

        <div className="lg:flex lg:flex-1 lg:flex-row lg:justify-between lg:items-center 2xl:justify-start">
          <div className="min-w-full relative lg:min-w-[100vh]">
            <Image
              src="https://i.ibb.co/gMmGqtY/mortyportal.gif"
              alt={character.name as string}
              className="saturate-125"
              layout="responsive"
              width={300}
              height={300}
            />

            <Link href={`/character/${character.id - 1}`}>
              <a className="group m-0 p-1 bg-rose-500 rounded-full flex-1 flex justify-center items-center absolute left-2 top-[43%] md:left-5 2xl:left-8  hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-rose-500 transition-colors">
                <button
                  className="group-hover:animate-bouncex disabled:group-hover:animate-none focus:outline-none"
                  disabled={character.id === 1 ? true : false}
                >
                  <CaretLeft
                    className="w-8 h-8 md:w-14 md:h-14 2xl:w-24 2xl:h-24"
                    color={character.id === 1 ? "#acacac" : "#fff"}
                    weight="regular"
                  />
                </button>
              </a>
            </Link>

            <Link href={`/character/${character.id + 1}`}>
              <a className="group m-0 p-1 bg-rose-500 rounded-full flex-1 flex justify-center items-center absolute right-2 top-[43%] md:right-5 2xl:right-8  hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-rose-500 transition-colors">
                <button className="group-hover:animate-bouncex disabled:group-hover:animate-none focus:outline-none">
                  <CaretRight
                    className="w-8 h-8 md:w-14 md:h-14 2xl:w-24 2xl:h-24"
                    color="#ffffff"
                    weight="regular"
                  />
                </button>
              </a>
            </Link>

            <div className="w-8/12 absolute top-[17%] right-[17%]">
              <Image
                src={character.image as string}
                alt={character.name as string}
                className="saturate-125 rounded-full"
                layout="responsive"
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="group">
            <div className="p-4 flex flex-1 flex-col md:justify-center md:p-8 xl:m-0 md:gap-5 lg:py-0 lg:px-6 lg:gap-8 xl:gap-10 xl:mx-auto 2xl:pl-12 2xl:pr-[calc(100vh-52vw)] 2xl:gap-[3vw]">
              <div>
                <div className="flex flex-1 items-center flex-row mt-0.5 md:mt-1">
                  <Circle
                    className="w-4 h-4 mr-1 md:w-6 md:h-6 md:mr-2 2xl:w-8 2xl:h-8"
                    color={
                      character.status === "Alive"
                        ? "#11f30d"
                        : character.status === "Dead"
                        ? "#ee1e1e"
                        : "#7e7e7e"
                    }
                    weight="fill"
                  />
                  <span className="text-white font-Roboto font-medium text-xl md:text-3xl capitalize 2xl:text-[clamp(2.5rem,2.5vw,4rem)]">
                    {character.status} - {character.species}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-slate-200 tracking-wide underline font-Roboto font-medium text-xl mt-2 md:text-3xl 2xl:text-[clamp(2.5rem,2.5vw,4rem)]">
                  Origin:
                </h5>
                <p className="text-white font-Roboto text-2xl tracking-wide md:text-4xl mt-2 first-letter:capitalize 2xl:text-[clamp(2.75rem,2.75vw,4.5rem)] 2xl:mt-[2vw] 2xl:leading-tight">
                  {character.origin.name}
                </p>
              </div>

              <div>
                <h5 className="text-slate-200 tracking-wide underline font-Roboto font-medium text-xl mt-2 md:text-3xl 2xl:text-[clamp(2.5rem,2.5vw,4rem)]">
                  Location:
                </h5>
                <p className="text-white font-Roboto text-2xl tracking-wide md:text-4xl mt-2 first-letter:capitalize 2xl:text-[clamp(2.75rem,2.75vw,4.5rem)] 2xl:mt-[2vw] 2xl:leading-tight">
                  {character.location.name} - {locationType}
                </p>
              </div>

              <div>
                <h5 className="text-slate-200 tracking-wide underline font-Roboto font-medium text-xl mt-2 md:text-3xl 2xl:text-[clamp(2.5rem,2.5vw,4rem)]">
                  First seen in:
                </h5>
                <p className="text-white font-Roboto text-2xl tracking-wide md:text-4xl mt-2 first-letter:capitalize 2xl:text-[clamp(2.75rem,2.75vw,4.5rem)] 2xl:mt-[2vw] 2xl:leading-tight">
                  {episode.name} - episode {episode.id}
                </p>
              </div>

              <Link href={"/"}>
                <a className="hidden lg:font-Roboto lg:bg-rose-500 lg:rounded-full lg:border-transparent lg:xl:flex-1 lg:justify-center lg:items-center hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-rose-500 transition-colors lg:p-5 text-4xl lg:flex 2xl:p-8">
                  <button className="text-white w-10/12 ml-6 hidden lg:block">
                    Back To Catalog
                  </button>
                  <ArrowUDownRight
                    className="w-10 h-10 hidden lg:block"
                    color="#ffffff"
                    weight="bold"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <Link href={"/"}>
          <a className="font-Roboto font-medium text-lg mx-4 mt-4 p-2 bg-rose-500 rounded-full border-transparent flex-1 flex justify-end items-center hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-rose-500 transition-colors md:p-5 md:mx-8 md:mt-6 md:text-3xl lg:hidden">
            <button className="w-9/12 text-white md:w-10/12">
              Back To Catalog
            </button>
            <ArrowUDownRight
              className="w-6 h-6 mr-3 md:w-9 md:h-9 md:mr-4"
              color="#ffffff"
              weight="bold"
            />
          </a>
        </Link>
        <div className="pb-4 md:pb-10 lg:hidden"></div>
      </div>
    </>
  );
}
