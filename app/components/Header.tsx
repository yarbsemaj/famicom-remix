import { Link } from "@remix-run/react"

const Header = () => {
    return (
        <header className="bg-indigo-200 text-indigo-900">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="text-lg font-bold">Famiclone Game List</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
export default Header