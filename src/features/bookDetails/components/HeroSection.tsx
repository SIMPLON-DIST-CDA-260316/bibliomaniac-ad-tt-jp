import { Check, ChevronLeft, Share2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import IconButton from "../../../shared/ui/IconButton";

type HeroSectionProps = {
  thumbnail: string;
  title: string;
};

export default function HeroSection({ thumbnail, title }: HeroSectionProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-primary/50 flex justify-center pt-6 px-6">
      <div className="absolute w-full flex justify-between px-6">
        <IconButton icon={ChevronLeft} onClick={() => navigate(-1)} />
        <IconButton icon={copied ? Check : Share2} onClick={handleShare} />
      </div>
      <img src={thumbnail} alt={title} className="h-64" />
    </section>
  );
}
