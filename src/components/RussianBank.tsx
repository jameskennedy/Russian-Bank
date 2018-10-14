import * as React from 'react';
import AIConsoleContainer from '../containers/AIConsoleContainer';
import GameBoardContainer from '../containers/GameBoardContainer';

export interface IRussianBankProps {
  newSolitaire1Player: () => void;
  newSolitaire2Player: () => void;
}

class RussianBank extends React.PureComponent<IRussianBankProps> {
  constructor(props: IRussianBankProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div>
          <button onClick={this.props.newSolitaire1Player}>1 player</button>
          <button onClick={this.props.newSolitaire2Player}>2 player</button>
          <AIConsoleContainer />
        </div>
        <GameBoardContainer />
      </div>);
  }
}

export default RussianBank;
