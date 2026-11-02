import './BattleLog.css'

function BattleLog({ logs }) {
  return (
    <div className="battle-log">
      <div className="battle-log__header">
        <span className="battle-log__dot"></span>
        <span className="battle-log__title">Battle Log</span>
      </div>
      <div className="battle-log__entries">
        {logs.map((log, index) => (
          <p key={index} className="battle-log__entry">{log}</p>
        ))}
      </div>
    </div>
  );
}

export default BattleLog