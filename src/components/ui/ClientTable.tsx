"use client";

import { TableData } from "@/types/tables.types";
import { useState } from "react";

type ClientTableProps = {
  data: TableData;
  paginated?: boolean;
  itemsPerPage?: number;
};
export function ClientTable({
  data,
  paginated = false,
  itemsPerPage = Infinity
}: ClientTableProps): React.ReactNode {
  const pages = paginated ? createPages(data.values, itemsPerPage) : [data.values];
  const [currentPage, setCurrentPage] = useState(0);

  if (paginated) {
    const footers = [];
    const paginationButtons = (
      <PaginationButtons
        numPages={pages.length}
        currentPage={currentPage}
        onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
          const newPage = parseInt(evt.currentTarget.dataset["pageNumber"] || "0");
          setCurrentPage(newPage);
        }}
      />
    );
    footers.push("");
    footers.push(paginationButtons);
    data.footers = footers;
  }

  return (
    <table className="table table-zebra border border-base-300 mt-3">
      <Thead headers={data.headers} />
      <Tbody values={pages[currentPage] || []} />
      <Tfooter footers={data.footers} />
    </table>
  );

  function createPages(values: React.ReactNode[][], itemsPerPage: number) {
    if (itemsPerPage <= 0) {
      throw new Error("Page size must be a positive number");
    }

    let pages;

    if (itemsPerPage === Infinity) {
      pages = [values];
    } else {
      pages = Array.from(
        { length: Math.ceil(values.length / itemsPerPage) },
        (v, i) => values.slice(i * itemsPerPage, i * itemsPerPage + itemsPerPage)
      );
    }
    
    return pages;
  };
}

type PaginationButtonProps = {
  numPages: number;
  currentPage: number;
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};
function PaginationButtons({
  numPages,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  const buttons = [];

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    onClick(evt);
  };

  for (let i = 0; i < numPages; i++) {
    buttons.push(
      <button
        className={`join-item btn btn-xs ${
          i === currentPage ? "btn-active" : ""
        }`}
        onClick={handleClick}
        key={`page-${i}`}
        data-page-number={i}
      >
        {i + 1}
      </button>
    );
  }
  return (
    <div className="flex justify-end">
      <span className="me-1">Page: </span>
      <div className="join">
        {buttons}
      </div>
    </div>
  );
}

function Row({ cells }: { cells: React.ReactNode[] }): React.ReactNode {
  return <tr>{cells}</tr>;
}

function Cell({
  value,
  type = "body",
}: {
  value: React.ReactNode;
  type?: string;
}) {
  if (type === "body") {
    return <td>{value}</td>;
  } else {
    return <th>{value}</th>;
  }
}

function Tbody({
  values,
}: {
  values: Array<React.ReactNode[]>;
}): React.ReactNode {
  const rows: React.ReactNode[] = [];

  values.forEach((rowData, rowIndex) => {
    const rowCells = rowData.map((cellValue, cellIndex) => (
      <Cell value={cellValue} key={`${rowIndex}-${cellIndex}`} />
    ));
    rows.push(<Row cells={rowCells} key={`row-${rowIndex}`} />);
  });

  return <tbody>{rows}</tbody>;
}

function Thead({ headers }: { headers: React.ReactNode[] | undefined }) {
  const tHeadCells = headers?.map((header, index) => {
    return <Cell type="header" value={header} key={`header-${index}`} />;
  });

  const tHead =
    tHeadCells && tHeadCells.length > 0 ? (
      <thead>
        <Row cells={tHeadCells} />
      </thead>
    ) : (
      ""
    );

  return tHead;
}

function Tfooter({ footers }: { footers: React.ReactNode[] | undefined }) {
  const tFooterCells = footers?.map((footer, index) => {
    return <Cell type="footer" value={footer} key={`header-${index}`} />;
  });

  const tFooter =
    tFooterCells && tFooterCells.length > 0 ? (
      <tfoot>
        <Row cells={tFooterCells} />
      </tfoot>
    ) : (
      ""
    );

  return tFooter;
}
