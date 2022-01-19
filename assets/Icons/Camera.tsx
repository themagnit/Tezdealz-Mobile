import React from "react";
import { Svg, Rect, Path, Mask, G, Circle } from "react-native-svg";

function Camera(props) {
  return (
    <Svg
      width={10}
      height={9}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m3.5 0-.915 1H1c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1H7.415L6.5 0h-3ZM5 7.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Camera;
