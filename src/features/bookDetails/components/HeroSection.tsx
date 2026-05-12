import { Check, ChevronLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import IconButton from "../../../shared/ui/IconButton";

type HeroSectionProps = {
  thumbnail: string;
  title: string;
};

export default function HeroSection({ thumbnail, title }: HeroSectionProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <section className="bg-primary/50 flex justify-center pt-6 px-6 md:bg-transparent md:relative md:flex-col md:items-center md:justify-end md:pb-8 md:min-h-80">
      <div className="absolute w-full flex justify-between px-6 md:top-4 md:left-0 md:right-0 md:w-full">
        <IconButton icon={ChevronLeft} onClick={() => navigate(-1)} />
        <div className="relative flex flex-col items-center">
          <IconButton icon={copied ? Check : Share2} onClick={handleShare} />
          {copied && (
            <div className="absolute top-[calc(100%+1rem)] pointer-events-none bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
              Lien copié
            </div>
          )}
        </div>
      </div>
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={title}
          className="h-64 md:h-56 md:mt-12 md:rounded-xl md:shadow-xl md:object-cover"
        />
      ) : (
        <div className="h-64 w-44 md:h-56 md:mt-12 md:rounded-xl md:shadow-xl bg-primary/20 flex items-center justify-center text-sm text-foreground/40 rounded-xl">
          Couverture indisponible
        </div>
      )}
    </section>
  );
}
