import * as React from "react";
import classNames from "classnames";

const enum AnimationState {
  IDLE,
  APPLY_TRANSFORM,
  PLAY_ANIMATION
}

type AnimatedHeightStatelessProps = {
  height: number;
  animationState: AnimationState;
  ratio?: number;
  onTransitionEnd(): void;
};

const AnimatedHeightStateless: React.ComponentType<
  AnimatedHeightStatelessProps
> = ({ animationState, height, ratio, children, onTransitionEnd }) => {
  const animating = animationState === AnimationState.PLAY_ANIMATION;
  const containerClassName = classNames("container", { animating });
  const childClassName = classNames("child", { animating });

  const applyTransform = animationState === AnimationState.APPLY_TRANSFORM;
  const containerTransform =
    ratio != null && applyTransform ? `translateZ(0) scaleY(${ratio})` : "translateZ(0)";
  const childTransform =
    ratio != null && applyTransform ? `translateZ(0) scaleY(${1 / ratio})` : "translateZ(0)";

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
  animationState: AnimationState;
  ratio?: number;
};

export class AnimatedHeight extends React.Component<
  AnimatedHeightProps,
  AnimatedHeightState
> {
  state = { animationState: AnimationState.IDLE, ratio: null };

  onTransitionEnd = () => {
    this.setState({ animationState: AnimationState.IDLE });
  };

  componentDidUpdate(previousProps: AnimatedHeightProps) {
    const lastHeight = previousProps.height;
    const currentHeight = this.props.height;
    if (lastHeight !== currentHeight) {
      const ratio = lastHeight / currentHeight;
      this.setState({ ratio, animationState: AnimationState.APPLY_TRANSFORM });
    } else if (this.state.animationState === AnimationState.APPLY_TRANSFORM) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({ animationState: AnimationState.PLAY_ANIMATION });
        });
      });
    }
  }

  render() {
    const { children, height } = this.props;
    const { animationState, ratio } = this.state;
    return (
      <AnimatedHeightStateless
        height={height}
        ratio={ratio}
        animationState={animationState}
        onTransitionEnd={this.onTransitionEnd}
      >
        {children}
      </AnimatedHeightStateless>
    );
  }
}
