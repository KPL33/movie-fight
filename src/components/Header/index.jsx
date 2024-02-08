import banner from "../../assets/Movie-Fight_Banner.jpg";
import './styles.css';

const Header = () => {
    return (
        <header>
            <img
            className="banner"
            src={banner}
            />
        </header>
    );
};
export default Header;
