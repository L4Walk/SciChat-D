import React from "react";
import "./footer.scss";
import BeianIcon from "../icons/beian.svg";
import { IconButton } from "./button";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <a href={"https://beian.miit.gov.cn/"} target="_blank">
          浙ICP备2023016350号
        </a>
      </div>
    </footer>
  );
};

export default Footer;
