import * as React from 'react';
import * as style from './Button.css';

interface IButtonProps {
  value: string;
}

class Button extends React.Component<IButtonProps> {
  public render() {
    return (
      <input
        type="button"
        className={style['button']}
        value={this.props.value}
      />
    );
  }
}

export default Button;
