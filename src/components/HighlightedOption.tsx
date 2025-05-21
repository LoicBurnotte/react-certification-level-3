import { escapeRegExp } from "@/lib/utils";

const HighlightedOption = ({
  name,
  query,
}: {
  name: string;
  query?: string;
}) => {
  if (!query) return <>{name}</>;

  const regex = new RegExp(`(${escapeRegExp(query)})`, "i");
  const parts = name.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default HighlightedOption;
