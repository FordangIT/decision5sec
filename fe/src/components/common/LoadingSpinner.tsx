import React from "react";
import { ClipLoader } from "react-spinners";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 80,
  color = "#000000",
  fullScreen = false
}) => {
  if (fullScreen) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <ClipLoader color={color} size={size} />
      </div>
    );
  }
  return <ClipLoader color={color} size={size} />;
};

export default LoadingSpinner;
