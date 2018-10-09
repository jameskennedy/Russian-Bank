import * as React from 'react';

export interface IAIConsoleProps {
  status: string;
}

class AIConsole extends React.PureComponent<IAIConsoleProps> {
  constructor(props: IAIConsoleProps) {
    super(props);
  }

  public render() {
    return (
      <span>{this.props.status}</span>);
  }
}

export default AIConsole;
