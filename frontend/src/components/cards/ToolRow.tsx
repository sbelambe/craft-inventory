import type { Tool } from "../../types";
import "./ToolRow.css";

type Props = {
  tool: Tool;
  onClick?: () => void; // optional later
};

export default function ToolRow({ tool, onClick }: Props) {
  return (
    <div className="toolrow" onClick={onClick} role={onClick ? "button" : undefined}>
      <div className="toolrow__main">

        {/* Small “details” line changes by tool type */}
        {tool.type === "crochetHook" && (
          <div className="size">Size: {tool.size}</div>
        )}

        {tool.type === "knittingNeedle" && (
          <div className="size_length">
            Size: {tool.size} • Length: {tool.length}
          </div>
        )}

        {tool.type === "generic" && (
          <div className="category">{tool.category}</div>
        )}
      </div>

      {/* Optional: right-side affordance (keep empty for now) */}
      <div className="toolrow__right" />
    </div>
  );
}
