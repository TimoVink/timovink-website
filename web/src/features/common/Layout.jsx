import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'


const SocialIcon = ({ icon, url }) => (
    <a href={url}>
        <FontAwesomeIcon icon={icon} />
    </a>
);

const SocialIcons = () => (
    <span className="space-x-2">
        <SocialIcon icon={faGithubSquare} url="https://github.com/TimoVink" />
        <SocialIcon icon={faLinkedin} url="https://www.linkedin.com/in/timo-vink-380a1426/" />
        <SocialIcon icon={faEnvelopeSquare} url="mailto:timovink@gmail.com" />
    </span>
);

const Cover = () => (
    <div className="w-full mb-8 sm:mb-12">
        <div className="relative w-full text-center overflow-x-hidden">
            <div className="-mx-16">
                <span className="text-6xl sm:text-[8rem] whitespace-nowrap font-semibold tracking-wider text-white opacity-[0.07] leading-[normal]">
                    {"<blog />"}
                </span>
            </div>
            <div className="absolute z-10 inset-0 flex justify-center items-center">
                <Link to="/" className="mt-2 sm:mt-5 text-3xl sm:text-4xl font-semibold tracking-widest select-none">
                    Timo Vink
                </Link>
            </div>
        </div>
        <div className="h-16" />
    </div>
);

const Header = () => (
    <header className="w-full flex flex-col items-center bg-orange-500 text-white">
        <div className="w-full max-w-4xl px-8 pt-8">
            <div className="hidden sm:flex justify-end text-2xl">
                <SocialIcons />
            </div>
        </div>
        <Cover />
    </header>
);

const Content = () => (
    <div className="w-full max-w-4xl px-4 sm:px-16 pb-4 sm:pb-16">
        <div className="-mt-16 p-6 sm:p-8 md:p-16 space-y-12 bg-white text-slate-600 shadow-[0_30px_50px_0_rgba(0,0,0,0.15)]">
            <Outlet />
        </div>
    </div>
);

const Layout = () => (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
        <Header />
        <Content />
    </div>
);

export default Layout;
