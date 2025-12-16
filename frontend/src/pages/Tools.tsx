import "../styles/global.css";
import ToolGroupCard from "../components/cards/ToolGroupCard";
import ToolRow from "../components/cards/ToolRow";

export default function Tools() {
  const crochetHook1 = {
    id: "1",
    type: "crochetHook" as const,
    dateBought: "2023-10-01",
    size: "4.5mm",
  };
  const crochetHook2 = {
    id: "2",
    type: "crochetHook" as const,
    dateBought: "2022-05-15",
    size: "2mm",
  };
  const crochetHook3 = {
    id: "3",
    type: "crochetHook" as const,
    dateBought: "2021-08-20",
    size: "8mm",
  };
  const knittingNeedle1 = {
    id: "4",
    type: "knittingNeedle" as const,
    dateBought: "2020-11-11",
    size: "8 US",
    length: "16 inches",
  };
  const genericTool1 = {
    id: "5",
    type: "generic" as const,
    dateBought: "2019-03-30",
    description: "Measuring Tape",
  };

  const crochetHooks = [crochetHook1, crochetHook2, crochetHook3];
  const knittingNeedles = [knittingNeedle1];
  const genericTools = [genericTool1];

  return (
    <div>
      <ToolGroupCard title="Crochet Hooks">
        {crochetHooks.map((t) => (
          <ToolRow key={t.id} tool={t} />
        ))}
      </ToolGroupCard>

      <ToolGroupCard title="Knitting Needles">
        {knittingNeedles.map((t) => (
          <ToolRow key={t.id} tool={t} />
        ))}
      </ToolGroupCard>

      <ToolGroupCard title="Sewing">
        {genericTools.map((t) => (
          <ToolRow key={t.id} tool={t} />
        ))}
      </ToolGroupCard>
    </div>
  );
}
