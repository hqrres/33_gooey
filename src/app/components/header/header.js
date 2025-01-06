function Header() {
    return (
        <header className="w-full h-32 p-4 text-lg flex items-center justify-between z-[999]">
            <nav className="flex space-x-8">
                <a className="" href="#home">Home</a>
                <a className="" href="#about">About</a>
            </nav>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <img src="/prorapparit_logo.svg" alt="Logo" className="h-28" />
            </div>
            <nav className="flex space-x-8">
                <a className="" href="#services">Services</a>
                <a className="" href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;