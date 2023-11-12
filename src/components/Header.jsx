import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Shoot Children' Scares Game</Link>
        </div>
        <div className="team-title">JuniorHackaton "TEAM #9"</div>
      </div>
    </header>
  )
}

export default Header;