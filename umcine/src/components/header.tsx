function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <div className="logo">UMCine</div>
          <nav className="nav">
            <a href="#" className="active">
              영화
            </a>
            <a href="#">리뷰</a>
            <a href="#">내 정보</a>
          </nav>
        </div>

        <div className="header-right">
          <button className="search-btn" type="button">
            <img src="/icons/search.svg" alt="검색" />
          </button>

          <button className="login-btn" type="button">
            로그인
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
