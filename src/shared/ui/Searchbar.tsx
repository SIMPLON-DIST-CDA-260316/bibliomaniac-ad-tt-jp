import { Loader2, Search, X } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { useDebounce } from "../lib/hooks/useDebounce";

/**
 * Barre de recherche réutilisable avec debounce intégré.
 *
 * Usage minimal :
 *   const handleSearch = useCallback((query: string) => { ... }, []);
 *   <Searchbar onSearch={handleSearch} />
 *
 * - `onSearch` doit être mémoïsé avec useCallback pour éviter les boucles infinies.
 * - Le debounce (400 ms par défaut) est géré en interne — pas besoin d'en ajouter un côté parent.
 * - `isLoading` permet d'afficher le spinner pendant un appel API en cours.
 */
type SearchbarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  defaultValue?: string;
  minQueryLength?: number;
  className?: string;
  id?: string;
};

export default function Searchbar({
  onSearch,
  placeholder = "Recherche...",
  debounceMs = 400,
  isLoading = false,
  defaultValue = "",
  minQueryLength = 2,
  className = "",
  id,
}: SearchbarProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(defaultValue);
  const debouncedQuery = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length === 0 || trimmed.length >= minQueryLength) {
      onSearch(trimmed);
    }
    // onSearch est intentionnellement exclu : les parents doivent mémoïser le callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, minQueryLength]);

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length === 0 || trimmed.length >= minQueryLength) {
      onSearch(trimmed);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setInputValue("");
      onSearch("");
    }
  }

  function handleClear() {
    setInputValue("");
    onSearch("");
    inputRef.current?.focus();
  }

  const showClear = inputValue.length > 0 && !isLoading;

  return (
    <form
      role="search"
      aria-busy={isLoading}
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 bg-background border-2 border-primary rounded-full px-4 py-2 focus-within:ring-1 focus-within:ring-primary transition-shadow duration-300 ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        Rechercher
      </label>

      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={200}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-transparent text-text font-text text-sm outline-none placeholder:text-text/40 [&::-webkit-search-cancel-button]:hidden"
      />

      {showClear && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="text-text/40 hover:text-primary transition-colors duration-200 shrink-0 cursor-pointer"
        >
          <X size={18} />
        </button>
      )}

      {isLoading ? (
        <Loader2
          size={18}
          className="text-primary shrink-0 animate-spin"
          aria-label="Chargement en cours"
        />
      ) : (
        <button
          type="submit"
          aria-label="Lancer la recherche"
          className="text-primary shrink-0 cursor-pointer hover:opacity-70 transition-opacity duration-200"
        >
          <Search size={18} aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
