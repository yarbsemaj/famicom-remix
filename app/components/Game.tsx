import { Link } from "@remix-run/react"

const Game = ({ hit }: { hit: any }) => {
    return (
        <Link to={`/game/${hit.number}`}>
            <div className="m-1 relative">
                <img src={hit.image || 'https://assets.yarbsemaj.com/famicom/box-art/hb.jpg'} />
                {!hit.image && <h2 className="absolute bottom-10 font-bold w-full text-center">{hit.name}</h2>}
                <h1 className="absolute m-2 px-2 rounded-md text-lg bottom-0 right-0 bg-slate-100">{hit.number}</h1>
            </div>
        </Link>
    )
}
export default Game