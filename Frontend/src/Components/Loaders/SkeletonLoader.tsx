import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  count?: number;
  circle?: boolean;
  styles?: React.CSSProperties;
}

export function SkeletonLoader({
  width,
  height,
  count = 1,
  circle = false,
  styles,
}: SkeletonLoaderProps) {
  return (
    <Skeleton
      width={width}
      height={height}
      baseColor="#e0e0e0"
      highlightColor="#f0f0f0"
      circle={circle}
      count={count}
      style={styles}
    />
  );
}
