import {PageProps} from "../types";
import {Head, Link} from '@inertiajs/react';

export default function Welcome({
                                    auth,
                                    laravelVersion,
                                    phpVersion,
                                }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome"/>
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://th.bing.com/th/id/R.8dd49b2c52c65f811374ed03c5f4c3b2?rik=DGLQud4lXk5IMg&riu=http%3a%2f%2fmusiquesactuelles.net%2fwp-content%2fuploads%2f2013%2f04%2fcd_music_in_library-750x400.png&ehk=Ohc6%2boqbSd%2fgNjYcGYEi5ThXDZ3zWwFwQpeSmX%2bpWPc%3d&risl=&pid=ImgRaw&r=0"
                />
                <div
                    className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img
                                    className="h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"
                                    viewBox="0 0 62 65"
                                    fill="none"
                                    src={"https://cdn-icons-png.flaticon.com/512/7118/7118499.png"}
                                    alt={"icon"}
                                />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black text-lg ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black text-lg ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="relative mt-60 z-10 p-8">
                            <h1 className="text-4xl font-bold text-black mb-8">Discography</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">Thriller</h2>
                                    <p className="text-gray-700">Release Year: 1982</p>
                                </div>
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">Back in Black</h2>
                                    <p className="text-gray-700">Release Year: 1980</p>
                                </div>
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">The Dark Side of the Moon</h2>
                                    <p className="text-gray-700">Release Year: 1973</p>
                                </div>
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">The Bodyguard</h2>
                                    <p className="text-gray-700">Release Year: 1992</p>
                                </div>
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">Rumours</h2>
                                    <p className="text-gray-700">Release Year: 1977</p>
                                </div>
                                <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
                                    <h2 className="text-2xl font-semibold mb-2">The Eminem Show</h2>
                                    <p className="text-gray-700">Release Year: 2002</p>
                                </div>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
