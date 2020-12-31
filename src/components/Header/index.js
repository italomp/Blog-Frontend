import { Link } from 'react-router-dom';
import './header.css';
import Logo from './../../assets/header/logo_blog_programador.svg';

function Header(){
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={Logo} alt="Logo do Cabeçalho"/>
                </Link>
                <Link to="/login" name="enter">
                    Entrar
                </Link>
            </div>
        </header>
    );
}
export default Header;