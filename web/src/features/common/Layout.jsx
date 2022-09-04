import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons'


const SocialIcon = ({ icon, url }) => (
    <a href={url}>
        <FontAwesomeIcon icon={icon} />
    </a>
)

const SocialIcons = () => (
    <div className="space-x-2">
        <SocialIcon icon={faGithubSquare} url="https://github.com/TimoVink" />
        <SocialIcon icon={faLinkedin} url="https://www.linkedin.com/in/timo-vink-380a1426/" />
        <SocialIcon icon={faEnvelopeSquare} url="mailto:timovink@gmail.com" />
    </div>
)

const Header = () => (
    <div className="flex justify-between text-2xl">
        <div className="font-semibold">Timo Vink</div>
        <SocialIcons />
    </div>
)

const Cover = () => (
    <>
        <div className="m-16">
            <div className="text-4xl font-semibold tracking-wider">
                Hello, my name is <span>Timo</span>
            </div>
        </div>
        <div className="h-24" />
    </>
)

const Content = () => (
    <div className="-mt-16 p-16 space-y-12 bg-white text-slate-600 shadow-[0_30px_50px_0_rgba(0,0,0,0.15)]">
        <Outlet />
    </div>
)

const Layout = () => (
    <div className="flex flex-col items-center min-h-screen bg-neutral-100">
        <div className="w-full flex flex-col items-center bg-orange-500 text-white">
            <div className="w-full max-w-4xl px-4 py-8">
                <Header />
            </div>
            <Cover />
        </div>

        <div className="w-full max-w-4xl px-16 pb-16">
            <Content />
        </div>
    </div>
);

export default Layout;
