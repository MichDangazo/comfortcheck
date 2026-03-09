import Button from "../common/Button";

const Header = ({ title, lastUpdated, onRefresh, userRole = "Admin" }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">{title}</h1>
          <p className="header-meta">
            Welcome back, <span className="font-medium">{userRole}</span>
          </p>
        </div>
        <div className="header-controls">
          <div className="header-meta">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            showRipple={true}
          >
            🔄 Refresh
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;