import { useState, type FC } from "react";
import type { ITag } from "../../interface/ITag";

interface IProps {
  initialTags?: ITag[];
}

const Tags: FC<IProps> = ({ initialTags }) => {
  const [tags, setTags] = useState<ITag[]>(
    initialTags || [
      { id: 1, label: "Front-end", isActive: true },
      { id: 2, label: "React", isActive: false },
      { id: 3, label: "Accessibilidad", isActive: false },
    ]
  );

  const toggleTag = (id: number) => {
    setTags(prev =>
      prev.map(tag =>
        tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
      )
    );
  };

  const clearAll = () => {
    setTags(prev => prev.map(tag => ({ ...tag, isActive: false })));
  };

  return (
    <div className="w-[996px] grid grid-cols-[1fr_auto] gap-y-2 items-start">
      {/* Columna izquierda: tags (con wrap) */}
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map(tag => (
          <div
            key={tag.id}
            className={`
              flex items-center gap-1 px-3 py-1 text-sm rounded-full cursor-pointer
              transition-all duration-200
              ${tag.isActive ? "bg-[#BCBCBC]" : "bg-[#888888]"}
            `}
            onClick={() => !tag.isActive && toggleTag(tag.id)}
          >
            <span>{tag.label}</span>
            {tag.isActive && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tag.id);
                }}
                className="hover:bg-gray-500 rounded-full p-0.5 transition-colors ml-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Columna derecha: botón limpiar */}
      <button
        onClick={clearAll}
        className="justify-self-end text-gray-400 hover:text-white text-sm underline transition-colors ml-2"
      >
        Limpiar todo
      </button>
    </div>
  );
};

export default Tags;
