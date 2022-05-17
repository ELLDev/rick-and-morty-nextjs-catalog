import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CharactersCatalog from "../CharactersCatalog";

import styles from "./styles.module.css";

interface Character {
  id: number;
  name: string;
  image: string;
  // gender: string;
  species: string;
  status: string;
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
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        activeClassName="active"
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationButtons}
        previousClassName={isSearchNameActive ? styles.hidePageButton : styles.previousPageButton}
        nextClassName={isSearchNameActive ? styles.hidePageButton : styles.nextPageButton}
        // pageLinkClassName={styles.previousPageButton}
        // previousLinkClassName="page-link"
        // nextLinkClassName="page-link"
        // breakClassName="page-item"
        // breakLinkClassName="page-link"
        renderOnZeroPageCount={null || undefined}
      />
    </>
  );
}
