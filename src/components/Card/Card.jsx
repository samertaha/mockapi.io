// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import React from 'react';

class App extends React.Component {
  state = { avatars: [] };

  componentDidMount() {}
  toggleVisibilityOn = () => {
    this.style.style.visibility = 'visible';
  };
  toggleVisibilityOff = () => {
    this.style.style.visibility = 'hidden';
  };
  render() {
    const { id, avatarName, imgUrl } = this.props;
    return (
      <div
        key={id}
        className='Card'
        onMouseEnter={this.toggleVisibilityOn}
        onMouseLeave={this.toggleVisibilityOff}
      >
        <h5>{avatarName}</h5>
        <img src={imgUrl} alt={avatarName} />
        <div
          ref={(style) => {
            this.style = style;
          }}
          style={{ visibility: 'hidden' }}
        >
          <button type='button' onClick={() => this.props.pressEditBtn(id)}>
            Edit
          </button>
          <button type='button' onClick={() => this.props.pressDeleteBtn(id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default App;
