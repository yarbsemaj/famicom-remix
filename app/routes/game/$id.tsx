import { json, MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Tag from "~/components/Tag";

import games from '../../game.json'

export interface Game {
    number: number
    name: string
    system: string
    development: string
    conception: string
    genre: string[]
    publisher?: string
    ogGame?: string
    enName?: string
    GBID?: string
    manual?: string
    description?: string
    image?: string
    release?: string
    href?: string
}

// @ts-ignore
export async function loader({ params }: LoaderArgs) {
    const game = games.find((game) => game.number == params.id)
    let manual
    if (game?.manual && game.manual.endsWith('.html')) {
        manual = await (await fetch(`https://assets.yarbsemaj.com/famicom${game.manual}`)).text()
    }
    return json({ game, manual });
}


export const meta: MetaFunction<typeof loader> = ({ data }) => ({
    title: data.game?.name,
});

export default function Index() {
    const [showModal, setShowModal] = useState(false)
    const { game, manual } = useLoaderData() as { game: Game, manual?: string }
    return (<div className="max-w-7xl p-4 md:grid grid-cols-[500px_1fr] flex-col gap-4 m-auto">
        <div className="md:w-full">
            <img src={game.image || 'https://assets.yarbsemaj.com/famicom/box-art/hb.jpg'} />
            <div className="overflow-x-auto">
                <div className="mt-2 flex gap-2">
                    <Tag tag={game.conception} />
                    <Tag tag={game.development} />
                    {game.genre.map(genre => <Tag key={genre} tag={genre} />)}
                </div>
            </div>
        </div>
        <div>
            <h1 className="font-bold text-3xl">{game.number}. {game.name}</h1>
            {game.ogGame && <h2 className="font-bold text-xl text-slate-500	">{game.ogGame}</h2>}
            {game.enName && <h2 className="font-bold text-xl text-slate-500	">{game.enName}</h2>}
            {game.publisher && <h2 className="text-lg text-slate-700">Publisher: {game.publisher}</h2>}
            {game.release && <h2 className="text-lg text-slate-700">Release: {game.release}</h2>}
            <p className="pt-5">
                {game.description}
            </p>
            {game.GBID && <div><a className="underline" href={`https://www.giantbomb.com/super-mario-bros/${game.GBID}/`}>More info</a></div>}
            {manual && <div className="underline cursor-pointer" onClick={() => setShowModal(true)}>Manual</div>}
            {game.manual && !manual && <div><a className="underline" href={`https://assets.yarbsemaj.com/famicom${game.manual}`}>Manual</a></div>}
            {showModal && manual && <Modal modalText={manual} onClose={() => setShowModal(false)} />}
        </div>
    </div >)
}


const Modal = ({ modalText, onClose }: { modalText: string, onClose: () => void }) => {
    return (<div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="cursor-pointer text-2xl absolute right-0 top-0 p-5 text-black" onClick={onClose}>
                                ×
                            </div>
                            <div className="mt-10">
                                <p className="prose max-w-full" dangerouslySetInnerHTML={{ __html: modalText }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}