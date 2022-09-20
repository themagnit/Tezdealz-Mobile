import React from "react";
import { Svg, Rect, Path, Mask, G, Circle } from "react-native-svg";

function Calender(props) {
  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.422 1.719H18.39V0h-1.72v1.719H5.329V0H3.61v1.719H2.58A2.581 2.581 0 0 0 0 4.297v15.125A2.581 2.581 0 0 0 2.578 22h16.844A2.581 2.581 0 0 0 22 19.422V4.297a2.581 2.581 0 0 0-2.578-2.578Zm.86 17.703a.86.86 0 0 1-.86.86H2.578a.86.86 0 0 1-.86-.86V8.078h18.563v11.344Zm0-13.063H1.718V4.297a.86.86 0 0 1 .86-.86h1.03v1.72h1.72v-1.72h11.343v1.72h1.719v-1.72h1.03a.86.86 0 0 1 .86.86v2.062Z"
        fill="#484848"
      />
      <Path
        d="M4.984 9.883H3.266v1.719h1.718v-1.72ZM8.422 9.883H6.703v1.719h1.719v-1.72ZM11.86 9.883h-1.72v1.719h1.72v-1.72ZM15.297 9.883h-1.719v1.719h1.719v-1.72ZM18.734 9.883h-1.718v1.719h1.718v-1.72ZM4.984 13.32H3.266v1.72h1.718v-1.72ZM8.422 13.32H6.703v1.72h1.719v-1.72ZM11.86 13.32h-1.72v1.72h1.72v-1.72ZM15.297 13.32h-1.719v1.72h1.719v-1.72ZM4.984 16.758H3.266v1.719h1.718v-1.72ZM8.422 16.758H6.703v1.719h1.719v-1.72ZM11.86 16.758h-1.72v1.719h1.72v-1.72ZM15.297 16.758h-1.719v1.719h1.719v-1.72ZM18.734 13.32h-1.718v1.72h1.718v-1.72Z"
        fill="#484848"
      />
    </Svg>
  );
}

export default Calender;
