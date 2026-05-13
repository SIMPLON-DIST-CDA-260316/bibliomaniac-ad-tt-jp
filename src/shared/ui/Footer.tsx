import { User, House, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {

    return (
        <div className="flex flex-row w-full justify-evenly bg-primary py-1 fixed bottom-0">

            {/*ligne des icones avec leurs noms*/}
                <Link to='/' className="flex ">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <House className="w-8 h-8" />
                        <p className='text-xs'>
                            Accueil
                        </p>
                    </div>
                </Link>
                <Link to='/search' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <Search className="w-8 h-8" />
                        <p className='text-xs'>
                            Recherche
                        </p>
                    </div>
                </Link>
                <Link to='/library' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <BookOpen className="w-8 h-8" />
                        <p className='text-xs'>
                            Bibliothèque
                        </p>
                    </div>
                </Link>
                <Link to='' className="flex">
                    <div className="flex flex-col items-center text-white lg:hover:scale-120 lg:transition-all lg:duration-300">
                        <User className="w-8 h-8" />
                        <p className='text-xs'>
                            Profil
                        </p>
                    </div>
                </Link>
        </div>
    );
}