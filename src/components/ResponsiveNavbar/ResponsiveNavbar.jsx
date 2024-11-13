import { NavLink } from "react-router-dom";
import { useNavbarState } from "../../hooks/useNavbarState";
import NavLinks from "../NavLinks/NavLinks";
import "./ResponsiveNavbar.css";

export default function ResponsiveNavbar() {
    const { isMenuOpen, isMobile, isTablet, toggleMenu, closeMobileMenu } = useNavbarState();

    return (
        <header className="header">
            <nav aria-label="london residential property price map" className={`container nav ${isMobile ? "nav-mobile" : "nav-web"}`}>
                {isMobile && (
                    <div className="nav__toggle hover-underline-animation left" id="nav-toggle" onClick={toggleMenu}>
                        MENU
                    </div>
                )}

                {isMobile ? (
                    <div className={`nav__menu ${isMenuOpen ? "show-menu" : ""}`} id="nav-menu" onClick={closeMobileMenu} data-testid="nav-menu">
                        {<NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>}
                        <div className="nav__close hover-underline-animation left" id="nav-close" onClick={toggleMenu}>
                            CLOSE
                        </div>
                    </div>
                ) : (
                    <NavLinks isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>
                )}
                <NavLink to="/" className={(isTablet || isMobile) ? "nav__logo__hidden" : "nav__logo"}>
                    <span>London Residential</span>
                    <span>Property Price Map</span>
                </NavLink>
            </nav>
        </header>
    )
}