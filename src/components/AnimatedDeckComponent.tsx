import * as gaussian from 'gaussian';
import * as React from 'react';
import Deck from '../engine/objects/Deck';
import DeckComponent from './DeckComponent';

const FPS: number = 30;

export interface IAnimatedDeckComponentProps {
  deck: Deck;
  secondsToComplete: number;
  startLeft: number;
  startTop: number;
  endLeft: number;
  endTop: number;
  animationComplete: () => void;
}

export interface IAnimatedDeckComponentState {
  animationTimer?: NodeJS.Timer;
  left: number;
  top: number;
  step: number;
  maxSteps: number;
}

class AnimatedDeckComponent extends React.Component<IAnimatedDeckComponentProps, IAnimatedDeckComponentState> {
  constructor(props: IAnimatedDeckComponentProps) {
    super(props);
    this.state = { left: this.props.startLeft, top: this.props.startTop, step: 0, maxSteps: this.props.secondsToComplete * FPS };
  }

  public componentDidMount() {
    this.startAnimation();
  }

  public componentWillReceiveProps(nextProps: Readonly<IAnimatedDeckComponentProps>, nextContext: any) {
    if (this.props.deck !== nextProps.deck) {
      this.startAnimation();
    }
  }

  public componentWillUnmount() {
    if (this.state.animationTimer) {
      this.stopAnimation();
    }
  }

  public render() {
    const noop = () => null;
    const left = this.state.left;
    const top = this.state.top;
    const styles: React.CSSProperties = {
      opacity: 0.6 + Math.max(20 - this.state.step, 0) * 0.02
    };
    return (
      <div style={styles}>
        <DeckComponent deck={this.props.deck} left={left} top={top}
          legalActions={[]}
          selectCard={noop}
          handleBeginDragDrop={noop}
          handleEndDragDrop={noop} />
      </div >);
  }

  private startAnimation() {
    const timer = setInterval(() => this.animationStep(), 1000 / FPS);
    this.setState({ animationTimer: timer, step: 0 });
  }

  private stopAnimation() {
    clearInterval(this.state.animationTimer as NodeJS.Timer);
    this.setState({ animationTimer: undefined });
  }

  private animationStep() {
    const step = this.state.step;
    if (step > this.state.maxSteps) {
      this.stopAnimation();
      this.props.animationComplete();
      return;
    }
    const variance = this.state.maxSteps;
    const distanceProgress = gaussian(0, variance).cdf(step - variance / 2);
    const left = ((this.props.endLeft - this.props.startLeft) * distanceProgress) + this.props.startLeft;
    const top = ((this.props.endTop - this.props.startTop) * distanceProgress) + this.props.startTop;
    this.setState({ left, top, step: step + 1 });
  }


}

export default AnimatedDeckComponent;
