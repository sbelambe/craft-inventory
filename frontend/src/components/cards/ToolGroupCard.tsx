import Card from "../ui/Card";
import "./ToolGroupCard.css";

type ToolItem = {
  id: string;
  name: string;
};

type Props = {
  title: string;
  tools: ToolItem[];
  headerRight?: React.ReactNode;
  emptyText?: string;
};

export default function ToolGroupCard({
  title,
  tools,
  headerRight,
  emptyText = "No tools yet.",
}: Props) {
  return (
    <Card title={title} headerRight={headerRight}>
      {tools.length === 0 ? (
        <div className="toolgroup__empty">{emptyText}</div>
      ) : (
        <ul className="toolgroup__list">
          {tools.map((t) => (
            <li key={t.id} className="toolgroup__item">
              {t.name}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
