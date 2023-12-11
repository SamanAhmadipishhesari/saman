import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IRoleProps {
  title: string;
  isShowEdit?: boolean;
  onDelete?: Function;
  onEdit?: Function;
}

export default function Role({
  title,
  onDelete,
}: IRoleProps) {
  const stringToColour = (str: string) => {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }

  return (
    <span
      className={`text-white mr-3 px-3 py-1 rounded mb-3 w-fit inline-flex`}
      style={{backgroundColor:stringToColour(title) }}
    >
      {title}
      <a
        id="delete"
        className="fa-btn-wrapper pl-2 pr-0"
        onClick={() => onDelete && onDelete()}
      >
        <FontAwesomeIcon color="white" icon={faTrash} />
      </a>
    </span>
  );
}
