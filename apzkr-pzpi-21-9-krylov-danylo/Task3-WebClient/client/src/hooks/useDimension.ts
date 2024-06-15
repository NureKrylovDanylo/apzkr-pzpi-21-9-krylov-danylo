import { useEffect, RefObject, useState } from "react";
import { IDimension } from "../interfaces/IDimension";

interface IHookDimensionProps {
  elementRef: RefObject<HTMLDivElement>;
}

export const useDimension = ({ elementRef }: IHookDimensionProps) => {
  const [dimensions, setDimensions] = useState<IDimension>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(width),
        height: Math.round(height),
      });
    }
  }, [elementRef.current]);
  
  return { dimensions };
};