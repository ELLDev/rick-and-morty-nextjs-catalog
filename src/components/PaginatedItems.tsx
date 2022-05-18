import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CharactersCatalog from "./CharactersCatalog";

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  origin: { name: string };
  location: { name: string };
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  allMortyCharacters: Character[];
}

export default function PaginatedItems({
  itemsPerPage,
  allMortyCharacters,
}: PaginatedItemsProps) {
  const [pageCount, setPageCount] = useState(0);
  const [mortyCharactersCount, setMortyCharactersCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const [isSearchNameActive, setIsSearchNameActive] = useState(false);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % mortyCharactersCount;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage);
  }, [itemOffset, itemsPerPage]);

  return (
    <>
      <CharactersCatalog
        allMortyCharacters={allMortyCharacters}
        itemsPerPage={itemsPerPage}
        itemOffset={itemOffset}
        setItemOffset={setItemOffset}
        endOffset={endOffset}
        setMortyCharactersCount={setMortyCharactersCount}
        setPageCount={setPageCount}
        setIsSearchNameActive={setIsSearchNameActive}
      />

      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        activeClassName="active"
        breakLabel="⋯"
        nextLabel=">"
        previousLabel="<"
        containerClassName="flex flex-1 flex-row gap-6 items-center justify-center text-xl mb-5"
        pageClassName=""
        previousClassName={isSearchNameActive ? "hidden" : "block"}
        nextClassName={isSearchNameActive ? "hidden" : "block"}
        pageLinkClassName="text-zinc-900 px-2 rounded-full ring-1 ring-blue-500 ring-offset-4 ring-offset-slate-200"
        previousLinkClassName="font-NanumGothic px-2 py-0.5 font-bold text-[color:#08BAE3] rounded-full ring-1 ring-zinc-700 ring-offset-4 ring-offset-slate-200"
        nextLinkClassName="font-NanumGothic px-2 py-0.5 font-bold text-[color:#08BAE3] rounded-full ring-1 ring-zinc-700 ring-offset-4 ring-offset-slate-200"
        breakClassName="text-zinc-900"
        breakLinkClassName=""
        renderOnZeroPageCount={null || undefined}
      />
    </>
  );
}