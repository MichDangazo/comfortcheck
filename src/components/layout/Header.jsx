import Button from "../common/Button";

const Header = ({ title, lastUpdated, onRefresh, userRole = "Admin" }) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600">
            Welcome back, <span className="font-medium">{userRole}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
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