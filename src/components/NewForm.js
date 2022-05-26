import React from 'react';

class NewForm extends React.Component {
  state = {
    name: '',
    url: `https://picsum.photos/128/128?random=${Date.now()}`,
    isEditing: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addAvatar(this.state);
    e.target.reset();
  };

  updateState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <div onClick={this.props.toggleForm} className='overlay'></div>
        <div className='newForm'>
          <form onSubmit={this.handleSubmit}>
            <input
              name='name'
              autoComplete='off'
              placeholder='New baby name'
              required
              type='text'
              onChange={this.updateState}
            />
            <input type='submit' value='Add +' className='btn' />
            <h3>We will create his image</h3>
          </form>
        </div>
      </>
    );
  }
}

export default NewForm;
