import { TableData } from "@/app/lib/definitions";

export function BasicTable({ data }: { data: TableData }): React.ReactNode {
  return (
    <table className="table table-zebra">
      <Thead headers={data.headers} />
      <Tbody values={data.values} />
      <Tfooter footers={data.footers} />
    </table>
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
    return <Cell type="header" value={footer} key={`header-${index}`} />;
  });

  const tFooter =
    tFooterCells && tFooterCells.length > 0 ? (
      <thead>
        <Row cells={tFooterCells} />
      </thead>
    ) : (
      ""
    );

  return tFooter;
}
