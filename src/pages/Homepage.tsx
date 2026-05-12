import { useState } from "react";
import BookList from "../features/book/components/BookList";
import FilterButton from "../shared/ui/FilterButton";

export default function Homepage() {

  const filterTab = [
    { name: 'Nouveautés' },
    { name: 'Popularité' },
    { name: 'Science-Fiction' },
    { name: 'Policier' },
    { name: 'BD' },
    { name: 'Nouvelles' },
    { name: 'Romans' },
    { name: 'Jeunesse' },
    { name: 'Fantasy' },
    { name: 'Aventure' }
  ]

  const [ titleFilter, setTitleFilter ] = useState<string>(filterTab[0].name);

  const filters = filterTab.map((filter) => (
    <FilterButton
      key={filter.name}
      name={filter.name}
      className="w-full"
      onClick={() => setTitleFilter(filter.name)}
    />
  ))

  return (
    <div className="px-3 py-4 md:p-10">
      <div>
        <h3 className="font-semibold pb-2">Catégories</h3>
        <div className="grid grid-rows-2 grid-flow-col gap-1 overflow-x-auto auto-cols-[130px] md:grid-cols-4 md:grid-rows-3 text-sm pb-1">
          {filters}
        </div>
      </div>
      <BookList title={titleFilter}/>
    </div>
  );
}
