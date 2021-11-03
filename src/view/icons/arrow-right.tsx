export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function ArrowRightIcon(props: IconProps) {
  const { width, height, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width={width || "512"}
      height={height || "512"}
      x="0"
      y="0"
      viewBox="0 0 451.846 451.847"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
      className=""
    >
      <g>
        <g xmlns="http://www.w3.org/2000/svg">
          <path
            d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"
            fill={color || "#ffffff"}
            data-original="#000000"
            className=""
          />
        </g>
      </g>
    </svg>
  );
}
