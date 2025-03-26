export const Card = ({ children }) => {
    return <div className="p-4 shadow-lg border rounded-lg">{children}</div>;
  };

export const CardContent = ({ children }) => {
    return <div className="p-4">{children}</div>;
  };