// useNavbarState.js
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useNavbarState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return {
    isMenuOpen,
    isMobile,
    toggleMenu,
    closeMobileMenu,
  };
};
