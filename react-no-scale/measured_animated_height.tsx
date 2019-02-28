import * as React from 'react';
import { AnimatedHeight } from './animated_height';
import { HeightMeasurer } from './height_measurer';

type MeasuredAnimatedHeightProps = { children: JSX.Element; className?: string; };

export const MeasuredAnimatedHeight = ({ children, className }: MeasuredAnimatedHeightProps) => {
  const [height, setHeight] = React.useState<number | undefined>(undefined);
  if (height === undefined) {
    return <HeightMeasurer onResize={setHeight} className={className}>{children}</HeightMeasurer>
  }

  return (
    <AnimatedHeight height={height} className={className}>
      <HeightMeasurer onResize={setHeight}>{children}</HeightMeasurer>
    </AnimatedHeight>
  );
}
