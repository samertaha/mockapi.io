import React from 'react';
import Card from './components/Card/Card';
import NewForm from './components/NewForm';
import EditForm from './components/EditForm';

import axios from 'axios';

import { API_URL } from './api';

import logo from './baby.png';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatars: [],
      newForm: false,
      editForm: false,
      beeingEdited: null,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.addAvatar = this.addAvatar.bind(this);
  }

  async componentDidMount() {
    try {
      const avatars = await axios.get(API_URL + 'avatars');
      this.setState({ avatars: avatars.data }, console.log(this.state.avatars));
    } catch (error) {
      console.log(error);
    }
  }
  // async componentDidUpdate() {
  //   try {
  //     const avatars = await axios.get(API_URL + 'avatars');
  //     this.setState({ avatars: avatars.data }, console.log(this.state.avatars));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  toggleForm() {
    // e.preventDefault();

    this.setState((prevState) => {
      return { avatars: [...prevState.avatars], newForm: !prevState.newForm };
    });
  }

  toggleEdit() {
    // e.preventDefault();

    this.setState((prevState) => {
      return { avatars: [...prevState.avatars], editForm: !prevState.editForm };
    });
  }

  addAvatar = async (newAvatar) => {
    try {
      const avatars = await axios.post(API_URL + 'avatars', newAvatar);
      console.log('after post: ', avatars);
      this.toggleForm();
      this.setState(
        { avatars: [...this.state.avatars, avatars.data] },
        console.log(this.state.avatars)
      );
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };

  pressEditBtn = (id) => {
    let Avatars = this.state.avatars;
    // Avatars[i].isEditing = true;
    const Avatar = Avatars.find((Avatar) => Avatar.id === id);
    this.setState({
      editForm: true,
      beeingEdited: Avatar,
    });
  };

  pressDeleteBtn = async (id) => {
    try {
      await axios.delete(API_URL + 'avatars/' + id);
      const newAvatars = this.state.avatars.filter(
        (Avatar) => Avatar.id !== id
      );
      this.setState(
        { avatars: [...newAvatars] },
        console.log(this.state.avatars)
      );
    } catch (error) {
      console.log(error);
    }
  };

  editAvatar = async (Avatar) => {
    try {
      const avatars = await axios.put(
        API_URL + 'avatars/' + this.state.beeingEdited.id,
        Avatar
      );

      this.toggleEdit();
      const av = this.state.avatars;
      console.log('Avatar.id: ', Avatar);
      av.find((Av) => Av.id === Avatar.id).name = avatars.data.name;
      // edAv.name = avatars.data.name;
      this.setState({ avatars: [...av] }, console.log(this.state.avatars));
    } catch (error) {
      console.log(error);
    }
  };
  confirmDelete = (id) => {};

  render() {
    return (
      <>
        <div className='App'>
          <header className='App-header'>
            <button
              type='button'
              onClick={this.toggleForm}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <img src={logo} className='App-logo' alt='logo' />
            </button>
            <div className='container'>
              {this.state.avatars.map(({ id, name, url }) => (
                <Card
                  key={id}
                  id={id}
                  avatarName={name}
                  imgUrl={url}
                  pressDeleteBtn={this.pressDeleteBtn}
                  pressEditBtn={this.pressEditBtn}
                />
              ))}
            </div>
          </header>
          {this.state.newForm && (
            <NewForm addAvatar={this.addAvatar} toggleForm={this.toggleForm} />
          )}
          {this.state.editForm && (
            <EditForm
              editAvatar={this.editAvatar}
              toggleEdit={this.toggleEdit}
              beeingEdited={this.state.beeingEdited}
            />
          )}
        </div>
        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </>
    );
  }
}

export default App;
