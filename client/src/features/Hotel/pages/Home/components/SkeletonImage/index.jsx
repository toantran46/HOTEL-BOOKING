import { Skeleton } from "antd";
import React from "react";

function SkeletonImage({ width, height }) {
  return (
    <div style={{ position: "relative" }}>
      <Skeleton.Image style={{ width, height }} />
      <Skeleton
        active
        paragraph={{ rows: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          marginLeft: "1.3rem",
        }}
      />
    </div>
  );
}

export default SkeletonImage;
