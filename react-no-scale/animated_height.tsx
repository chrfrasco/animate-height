import * as React from 'react';
import classNames from 'classnames';

type AnimatedHeightProps = { className?: string; height: number; children: JSX.Element };

export const AnimatedHeight = ({ className, height, children }: AnimatedHeightProps) => {
  const animatedElementClassName = classNames('root', className);
  return (
    <div className={animatedElementClassName} style={{ height }}>
      <div className="child" style={{ transform: `translateY(calc(100% - ${height}px)` }}>
        {children}
      </div>
    </div>
  );
};
