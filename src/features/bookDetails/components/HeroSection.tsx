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
    <section className="bg-primary/50 flex justify-center pt-6 px-6">
      <div className="absolute w-full flex justify-between px-6">
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
      <img src={thumbnail} alt={title} className="h-64" />
    </section>
  );
}
