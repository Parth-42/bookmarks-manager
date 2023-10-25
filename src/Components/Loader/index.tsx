import React from "react";
import { useEffect } from "react";
import lottie from "lottie-web";
import { useRef } from "react";
import animationData from "../../lotties/loader.json";
import "./index.scss";

function Loader() {
  const animationContext: React.LegacyRef<HTMLDivElement> | undefined = useRef(
    null
  );
  const outerRef = React.useRef(null);

  useEffect(() => {
    if (animationContext.current) {
      lottie.loadAnimation({
        container: animationContext.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, []);
  return (
    <div className={"loader-container"}>
      <div ref={outerRef} className={"loader__overlay"} />
      <div className={"loader__box"}>
        <div className={"loader__content"}>
          <div ref={animationContext}></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
