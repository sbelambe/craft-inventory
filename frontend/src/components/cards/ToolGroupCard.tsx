import Card from "../ui/Card";
import "./ToolGroupCard.css";

type Props = {
  title: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  emptyText?: string;
  isEmpty?: boolean;
};

export default function ToolGroupCard({
  title,
  children,
  headerRight,
  emptyText = "No tools yet.",
  isEmpty = false,
}: Props) {
  return (
    <Card title={title} headerRight={headerRight}>
      {isEmpty ? <div className="toolgroup_empty">{emptyText}</div> : children}
    </Card>
  );
}
