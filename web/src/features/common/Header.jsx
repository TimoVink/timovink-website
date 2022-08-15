import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'
import gravatar from 'gravatar';
import { Link } from 'react-router-dom';


const SocialIcon = ({ icon, url }) => (
    <a href={url}>
        <FontAwesomeIcon icon={icon} />
    </a>
)

const SocialIcons = () => (
    <div className="text-2xl space-x-2 text-slate-300">
        <SocialIcon icon={faGithubSquare} url="https://github.com/TimoVink" />
        <SocialIcon icon={faLinkedin} url="https://www.linkedin.com/in/timo-vink-380a1426/" />
        <SocialIcon icon={faEnvelopeSquare} url="mailto:timovink@gmail.com" />
    </div>
)

const Avatar = () => {
    const imageUrl = gravatar.url('timovink@gmail.com', { s: 160 });
    return (
        <Link to="/">
            <img src={imageUrl} alt="Timo Vink" className="rounded-full w-20" />
        </Link>
    );
}


const Header = () => (
    <div className="w-full flex justify-between items-center">
        <div className="basis-0 grow"><SocialIcons /></div>
        <Avatar />
        <div className="basis-0 grow" />
    </div>
);


export default Header;
