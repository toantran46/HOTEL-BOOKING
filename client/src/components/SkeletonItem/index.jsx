import { Skeleton } from "antd";
import React from "react";

SkeletonItem.propTypes = {};

function SkeletonItem({ width = "100%", height = "100%" }) {
  width = width === 6 ? "180px" : "275px";
  return (
    <div
      style={{
        width,
        height,
        marginRight: "15px",
        marginTop: "1rem",
        border: "1px solid #eee",
      }}
    >
      <Skeleton.Image
        active
        style={{ width, height: "180px", marginBottom: "2px" }}
      />
      <div style={{ padding: "1rem" }}>
        <Skeleton.Button
          active
          style={{
            width: "140px",
            height: "16px",
            marginBottom: "10px",
            color: "#fff",
          }}
        />
        <br />

        <Skeleton.Button
          active
          style={{
            width: "100px",
            height: "16px",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default SkeletonItem;
