import { useState, useEffect } from "react";
import { CircleArrowUp } from "lucide-react";
import IconButton from "./IconButton";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // remonte en haut de la page en douceur
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // détecte si on a scrollé de plus de 100px pour afficher le bouton
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // ajoute l'écouteur de scroll au montage et le retire au démontage
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed bottom-18 right-2 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <IconButton
                icon={CircleArrowUp}
                onClick={scrollToTop}
                className="cursor-pointer bg-primary"
            />
        </div>
    )
}