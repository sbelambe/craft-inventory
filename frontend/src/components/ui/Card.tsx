import React from "react";
import "./Card.css";

interface CardProps {
  title?: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  headerRight,
  children,
  className = "",
}: CardProps) { 
  return (
    <div className={`card ${className}`}>
      {(title || headerRight) && (
        <div className="card__header">
          {title && <h2 className="card__title">{title}</h2>}
          {headerRight && (
            <div className="card__headerRight">{headerRight}</div>
          )}
        </div>
      )}

      <div className="card__body">{children}</div>
    </div>
  );
}
