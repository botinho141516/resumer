import ArrowLeftIcon from "./arrow-left";
import ArrowRightIcon from "./arrow-right";

export const enum iconsName {
  ArrowLeft = "arrow-left",
  ArrowRight = "arrow-right",
}

type IconName = iconsName;

interface CustomIconProps {
  name: IconName;
  width?: number;
  height?: number;
  color?: string;
  hoverColor?: string;
}

type Icons = Record<IconName, JSX.Element>;
export default function CustomIcon(props: CustomIconProps) {
  const { name, width, height, color } = props;

  const iconsMap: Icons = {
    "arrow-right": (
      <ArrowRightIcon width={width} height={height} color={color} />
    ),
    "arrow-left": <ArrowLeftIcon width={width} height={height} color={color} />,
  };

  return iconsMap[name];
}
