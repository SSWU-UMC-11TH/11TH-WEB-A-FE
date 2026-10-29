function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <strong className="logo">▣ UMCine</strong>

        <nav className="nav">
          <span>영화</span>
          <span>검색</span>
          <span>내 정보</span>
        </nav>
      </div>

      <div className="header-right">
        <button className="search-button">⌕</button>
        <button className="login-button">로그인</button>
      </div>
    </header>
  );
}

export default Header;