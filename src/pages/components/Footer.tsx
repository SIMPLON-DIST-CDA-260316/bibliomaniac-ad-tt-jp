import { User, House, BookOpen, Search } from 'lucide-react';

export default function Footer() {

    return (
        <div className="flex flex-row w-full max-w-lg justify-evenly bg-primary py-1 sticky">

            {/*ligne des icones avec leurs noms*/}
                <a href='/' className="flex ">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <House className="w-8 h-8" />
                        <p className='text-xs'>
                            Accueil
                        </p>
                    </div>
                </a>
                <a href='' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <Search className="w-8 h-8" />
                        <p className='text-xs'>
                            Recherche
                        </p>
                    </div>
                </a>
                <a href='' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <BookOpen className="w-8 h-8" />
                        <p className='text-xs'>
                            Bibliothèque
                        </p>
                    </div>
                </a>
                <a href='' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <User className="w-8 h-8" />
                        <p className='text-xs'>
                            Profil
                        </p>
                    </div>
                </a>
        </div>
    );
}