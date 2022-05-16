import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CharactersCatalog from "../CharactersCatalog";

import styles from "./styles.module.css";

interface PaginatedItemsProps {
  itemsPerPage: number;
}

export default function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
  const [pageCount, setPageCount] = useState(0);
  const [mortyCharactersCount, setMortyCharactersCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % mortyCharactersCount;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    setEndOffset(itemOffset + itemsPerPage);
    console.log(
      `Loading items from ${itemOffset} to ${itemOffset + itemsPerPage}`
    );
  }, [itemOffset, itemsPerPage]);

  return (
    <>
      <CharactersCatalog
        itemsPerPage={itemsPerPage}
        itemOffset={itemOffset}
        endOffset={endOffset}
        setMortyCharactersCount={setMortyCharactersCount}
        setPageCount={setPageCount}
      />

      <ReactPaginate
        onPageChange={handlePageClick}
        // page={setInitialPage} - upgrade to v9 - github:AdeleD/react-paginate#v9
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        activeClassName="active"
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        containerClassName={styles.paginationContainer}
        pageClassName={styles.paginationButtons}
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        renderOnZeroPageCount={null || undefined}
      />
    </>
  );
}
