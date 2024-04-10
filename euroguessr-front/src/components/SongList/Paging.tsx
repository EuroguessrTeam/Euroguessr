import React from "react";

interface SongListProps {
  className?: string;
}

export function Paging ({ className }:SongListProps) {
    return (
        <div className={className}>
            paging
        </div>
    )
}

export const PagingMemo = React.memo(Paging);
