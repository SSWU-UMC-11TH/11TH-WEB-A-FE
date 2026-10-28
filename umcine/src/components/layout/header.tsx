import { Link } from '@tanstack/react-router';

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <div className="logo">UMCine</div>
          <nav className="nav">
            <Link to="/" activeProps={{ className: 'active' }}>
              영화
            </Link>

            <a href="#">리뷰</a>
            <a href="#">내 정보</a>
          </nav>
        </div>

        <div className="header-right">
          <Link to="/search" className="search-btn">
            <img src="/icons/search.svg" alt="검색" />
          </Link>

          <button className="login-btn" type="button">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
