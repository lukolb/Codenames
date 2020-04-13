import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import TeamsModal from './TeamsModal';
import TeamNames from './TeamNames';
import randomise from '../utils/array-helpers';
import './Board.css';

class Board extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      cards: this.randomiseCards(),
      showTeamsModal: false,
      teams: {
        red: [],
        blue: [],
      },
    }
  }

  randomiseCards() {
    const defaultCard = { cardIsExpanded: false, contextMenuExpanded: false, color: '' };
    return randomise([...Array(280)].map((_, i) => ({ cardId: i, ...defaultCard }))).slice(0, 20);
  }

  toggleExpand(card) {
    this.resetCards(card);
    card.cardIsExpanded = !card.cardIsExpanded;
    this.setState({ cards: this.state.cards });
  }

  onContextMenu(card, e) {
    e.preventDefault();
    this.resetCards();
    card.contextMenuExpanded = !card.contextMenuExpanded;
    this.setState({ cards: this.state.cards });
  }

  resetAll(e) {
    if (e.target.parentElement.className === 'card' || e.target.parentElement.className === 'card') {
      return;
    }
    this.resetCards();
    this.setState({ cards: this.state.cards });
  }

  resetCards(card = {}) {
    this.state.cards.filter(c => c.cardId !== card.cardId).forEach(c => { c.cardIsExpanded = false; c.contextMenuExpanded = false; });
  }

  newGames() {
    this.state.cards = this.randomiseCards();
    this.forceUpdate();
  }

  resetColor(card) {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
    card.color = '';
    this.setState({ cards: this.state.cards });
  }

  toggleTeamsModal() {
    this.setState({ showTeamsModal: !this.state.showTeamsModal});
  }

  addPlayer(color, player) {
    console.log(this.state.teams[color]);

    this.state.teams[color].push(player);
    this.setState({ teams: this.state.teams });
  }

  updatePlayer(color, newValue, player) {
    this.state.teams[color][this.state.teams[color].indexOf(player)] = newValue;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {this.state.showTeamsModal ?
          <TeamsModal
            teams={this.state.teams}
            addPlayer={(color, player) => this.addPlayer(color, player)}
            updatePlayer={(color, newValue, player) => this.updatePlayer(color, newValue, player)}
            toggleTeamsModal={() => this.toggleTeamsModal()}
          /> : null}
        <div className="container" onClick={e => this.resetAll(e)}>
          <div className="side-wrapper">
            <TeamNames teamNames={this.state.teams.red} color="red" />
          </div>
          <div className="grid">
            {this.state.cards.map((card, index) => (
              <Card
                key={card.cardId}
                card={card}
                index={index+1}
                resetColor={() => this.resetColor(card)}
                onClick={() => this.toggleExpand(card)}
                onContextMenu={e => this.onContextMenu(card, e)}
              />
            ))}
          </div>
          <div>
          </div>
          <div className="side-wrapper">
            <TeamNames teamNames={this.state.teams.blue} color="blue" />
            <div>
              <button className="btn purple" onClick={() => this.toggleTeamsModal()}>Teams</button>
              <Link className="btn blue" target="_blank" to={`/spy-master/${Math.floor(Math.random() * 100)}`}>Spy Master</Link>
              <button className="btn" onClick={() => this.newGames()}>New Game</button>
              <Link className="btn purple" to="/">Rules</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
