import { useNavbarState } from "../../hooks/useNavbarState";
import NavLinks from "./NavLinks/NavLinks";
import "./Navbar.css";

const Navbar = () => {
    const { isMenuOpen, isMobile, isTablet, toggleMenu, closeMobileMenu } = useNavbarState();

    return (
        <header className={`header ${isMobile ? "header__mobile" : ""}`}>
            <nav aria-label="london residential property price map" className={`nav`}>
                {isMobile && (
                    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu} data-text="MENU">
                        <span>
                          MENU
                        </span>
                    </div>
                )}

                {isMobile ? (
                    <div className={`nav__menu ${isMenuOpen ? "show__menu" : ""}`} id="nav-menu" onClick={closeMobileMenu} data-testid="nav-menu">
                        {<NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>}
                        <div className="nav__close" id="nav-close" onClick={toggleMenu} data-text="CLOSE" >
                            <span>
                              CLOSE
                            </span>
                        </div>
                    </div>
                ) : (
                    <NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>
                )}
            </nav>
        </header>
    )
}

export default Navbar;
