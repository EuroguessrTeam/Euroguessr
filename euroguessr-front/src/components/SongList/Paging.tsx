import React from "react";

interface SongListProps {
  className?: string;
  actualPage: number;
  setActualPage: (page: number) => void;
  totalPages: number;
}

export function Paging ({ className, actualPage, setActualPage, totalPages } : SongListProps) {
  const swapPage = (page: number) => {
    console.log("swap to Page :");
    console.log(page);
    setActualPage(page);
  }

  return (
    <div className={className}>

      {/* Previous page button */}
      <button disabled={actualPage <= 1}
              onClick={() => swapPage(actualPage-1)}
              className="flex justify-center items-center">
        {"<"}
      </button>

      {/* Pages */}
      <div className="flex justify-center items-center">
        {actualPage} of {totalPages}
      </div>

      {/* Next page button */}
      <button disabled={actualPage >= totalPages}
              onClick={() => swapPage(actualPage+1)}
              className="flex justify-center items-center">
        {">"}
      </button>

    </div>
  )
}

export const PagingMemo = React.memo(Paging);
