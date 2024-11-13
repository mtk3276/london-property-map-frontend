// useNavbarState.js
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useNavbarState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    isTablet,
    toggleMenu,
    closeMobileMenu,
  };
};
