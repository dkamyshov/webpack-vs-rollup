import * as React from 'react';
import * as style from './Input.css';

interface IInputProps {
  value: string;
}

class Input extends React.Component<IInputProps> {
  public render() {
    return (
      <input className={style['input']} value={this.props.value} />
    )
  }
}

export default Input;
