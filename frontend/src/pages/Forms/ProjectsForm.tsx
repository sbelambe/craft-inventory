import { useState } from "react";
import type { Project } from "../../types";
import "./Form.css";

type Props = {
  onCreate: (project: Project) => void;
  onCancel?: () => void;
};

export default function ProjectForm({ onCreate, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [percentComplete, setPercentComplete] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const canSubmit = title.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const newProject: Project = {
      id: crypto.randomUUID(),
      title: title.trim(),
      percentComplete: Math.min(100, Math.max(0, percentComplete)),
      materialsUsed: [],
      toolsUsed: [],
      notes: notes.trim(),
    };

    onCreate(newProject);

    setTitle("");
    setPercentComplete(0);
    setNotes("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label className="form__label" htmlFor="title">
          Project title
        </label>
        <input
          id="title"
          className="form__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Granny square bag"
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="percent">
          Percent complete
        </label>
        <input
          id="percent"
          className="form__input"
          type="number"
          min={0}
          max={100}
          value={percentComplete}
          onChange={(e) => setPercentComplete(Number(e.target.value))}
        />
      </div>

      <div className="form__row">
        <label className="form__label" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          className="form__textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes, links, pattern info, etc."
          rows={4}
        />
      </div>

      <div className="form__actions">
        {onCancel && (
          <button
            type="button"
            className="form__btn form__btn--ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button type="submit" className="form__btn" disabled={!canSubmit}>
          Add Project
        </button>
      </div>
    </form>
  );
}
