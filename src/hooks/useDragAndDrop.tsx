import { useState } from "react";

const useDragAndDrop = () => {
  const [positionStart, setPositionStart] = useState<number>(0);
  const [positionEnter, setPositionEnter] = useState<number>(0);

  const onDragStart = (position: number) => {
    setPositionStart(position);
    console.log(
      "🚀 ~ file: useDragAndDrop.tsx:9 ~ onDragStart ~ position:",
      position
    );
  };
  const onDragEnter = (position: number) => {
    setPositionEnter(position);
    console.log(
      "🚀 ~ file: useDragAndDrop.tsx:13 ~ onDragEnter ~ position:",
      position
    );
  };

  return {
    positionStart,
    positionEnter,
    setPositionStart,
    setPositionEnter,
    onDragStart,
    onDragEnter,
  };
};

export default useDragAndDrop;
