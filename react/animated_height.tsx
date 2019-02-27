import * as React from "react";
import classNames from "classnames";

type AnimatedHeightStatelessProps = {
  height: number;
  animating: boolean;
  ratio?: number;
  transform: boolean;
  onTransitionEnd(): void;
};

const AnimatedHeightStateless: React.ComponentType<
  AnimatedHeightStatelessProps
> = ({ animating, transform, height, ratio, children, onTransitionEnd }) => {
  const containerClassName = classNames("container", { animating });
  const childClassName = classNames("child", { animating });

  const containerTransform =
    ratio != null && transform ? `scaleY(${ratio})` : "";
  const childTransform =
    ratio != null && transform ? `scaleY(${1 / ratio})` : "";

  return (
    <div
      className={containerClassName}
      style={{ height, transform: containerTransform }}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={childClassName} style={{ transform: childTransform }}>
        {children}
      </div>
    </div>
  );
};

type AnimatedHeightProps = { height: number };

type AnimatedHeightState = {
  animating: boolean;
  transform: boolean;
  ratio?: number;
};

export class AnimatedHeight extends React.Component<
  AnimatedHeightProps,
  AnimatedHeightState
> {
  state = { animating: false, transform: false, ratio: null };

  onTransitionEnd = () => {
    this.setState({ animating: false });
  };

  componentDidUpdate(previousProps: AnimatedHeightProps) {
    const lastHeight = previousProps.height;
    const currentHeight = this.props.height;
    if (lastHeight !== currentHeight) {
      const ratio = lastHeight / currentHeight;
      this.setState({ ratio, transform: true });
    } else if (this.state.transform) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({ animating: true, transform: false });
        });
      });
    }
  }

  render() {
    const { children, height } = this.props;
    const { animating, transform, ratio } = this.state;
    return (
      <AnimatedHeightStateless
        height={height}
        ratio={ratio}
        animating={animating}
        transform={transform}
        onTransitionEnd={this.onTransitionEnd}
      >
        {children}
      </AnimatedHeightStateless>
    );
  }
}
