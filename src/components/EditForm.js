import React from 'react';

class EditForm extends React.Component {
  state = {
    id: this.props.beeingEdited.id,
    name: '',
    //url: `https://picsum.photos/128/128?random=${Date.now()}`,
    url: 'https://i.pravatar.cc/128',
    isEditing: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editAvatar(this.state);
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
              defaultValue={this.props.beeingEdited.name}
              required
              type='text'
              onChange={this.updateState}
            />
            <input type='submit' value='SAVE' className='btn' />
            <img src={this.props.beeingEdited.url} alt='' />
          </form>
        </div>
      </>
    );
  }
}

export default EditForm;
