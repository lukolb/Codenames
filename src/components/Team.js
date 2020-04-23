import React from 'react';
import PropTypes from 'prop-types';
import './Team.css';

const Team = ({teams, teamColor, addPlayer, removePlayer, startingTeam, setStaringTeam, updatePlayer}) => {
  const [newPlayer, setNewPlayer] = React.useState('');
  
  const addNewPlayer = e => {
    e.preventDefault();
    if (!newPlayer)
      return;
    addPlayer(teamColor, newPlayer);
    setNewPlayer('');
  };
  
  const updateExistingPlayer = (player, idx) => updatePlayer(teamColor, player, idx);
  const currentStaringTeam = startingTeam === teamColor;

  return (
    <div className="teams-wrapper">
      <div className={`team team-${teamColor}`}>
        <h3 className="team-title">
            Team {teamColor}
          <button
            className={`starting-team ${currentStaringTeam ? 'active' : ''}`}
            onClick={() => setStaringTeam(teamColor)}
          />
        </h3>
        <form onSubmit={addNewPlayer}>
          <div className="players">
            {teams[teamColor].map((player, index) => (
              <div className="player-wrap" key={index}>
                <input
                  className="input"
                  value={player}
                  onChange={({ target: { value } }) => updateExistingPlayer(value, index)}
                />
                <button 
                  type="button" 
                  onClick={() => removePlayer(teamColor, index)} 
                  className="remove-player">x</button>
              </div>
            ))}
          </div>
          <input
            className="input"
            value={newPlayer}
            onChange={({ target: { value } }) => setNewPlayer(value)}
          />
          <button type="submit" className="btn">Add player</button>
        </form>
      </div>
    </div>
  );
};

Team.propTypes = {
  addPlayer: PropTypes.func,
  updatePlayer: PropTypes.func,
  removePlayer: PropTypes.func,
  setStaringTeam: PropTypes.func,
  teams: PropTypes.object,
  teamColor: PropTypes.string,
  startingTeam: PropTypes.string,
};

export default Team;