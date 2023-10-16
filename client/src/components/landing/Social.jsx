/* eslint-disable react/prop-types */
import { SocialIcon } from "react-social-icons";

const Social = ({link}) => {
  return (
    <SocialIcon
      url= {link}
      bgColor="white"
      fgColor="transparent"
      style={{ height: "40px", width: "40px" }}
    />
  );
};

export default Social;
