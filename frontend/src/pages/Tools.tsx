import "../styles/global.css";
import ToolGroupCard from "../components/cards/ToolGroupCard";

const TOOL_CATEGORIES = [
  { id: "crochet", label: "Crochet" },
  { id: "knitting", label: "Knitting" },
  { id: "sewing", label: "Sewing" },
  { id: "embroidery", label: "Embroidery" },
  { id: "painting", label: "Painting" },
  { id: "soldering", label: "Soldering" },
] as const;

export default function Tools() {
  const tools = [
    { id: "1", name: "4.5mm Hook", categoryId: "crochet" },
    { id: "2", name: "Stitch Markers", categoryId: "crochet" },
    { id: "3", name: "Yarn Needle", categoryId: "crochet" },

    { id: "4", name: "Size 8 Needles (16in)", categoryId: "knitting" },

    { id: "5", name: "Measuring Tape", categoryId: "sewing" },
    { id: "6", name: "Fabric Scissors", categoryId: "sewing" },

    { id: "7", name: "Gouache Paint", categoryId: "painting" },
    { id: "8", name: "Round Brushes", categoryId: "painting" },
  ];

  return (
    <div>
      {TOOL_CATEGORIES.map((cat) => {
        const toolsInCategory = tools.filter((t) => t.categoryId === cat.id);
        return (
          <ToolGroupCard
            key={cat.id}
            title={cat.label}
            tools={toolsInCategory}
            emptyText="No tools yet."
          />
        );
      })}
    </div>
  );
}
