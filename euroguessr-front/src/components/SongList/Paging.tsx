import React from "react";

interface SongListProps {
  className?: string;
  actualPage: number;
  setActualPage: (page: number) => void;
  totalPages: number;
}

export function Paging ({ className, actualPage, setActualPage, totalPages } : SongListProps) {
  const swapPage = (page: number) => {
    setActualPage(page);
  }

  return (
    <div className={className}>

      {/* Previous page button */}
      <button disabled={actualPage <= 1}
              onClick={() => swapPage(actualPage-1)}
              className="flex justify-center items-center font-bold disabled:opacity-40">
        {"<"}
      </button>

      {/* Pages */}
      <div className="flex justify-center items-center">
        {actualPage} / {totalPages}
      </div>

      {/* Next page button */}
      <button disabled={actualPage >= totalPages}
              onClick={() => swapPage(actualPage+1)}
              className="flex justify-center items-center font-bold disabled:opacity-40">
        {">"}
      </button>

    </div>
  )
}

export const PagingMemo = React.memo(Paging);
