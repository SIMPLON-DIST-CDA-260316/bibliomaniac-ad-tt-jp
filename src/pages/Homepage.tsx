import { useState } from "react";
import BookList from "../features/book/components/BookList";
import FilterButton from "../shared/ui/FilterButton";

export default function Homepage() {

  const categoriesTab = ["Fantasy", "Science-Fiction", "Aventure", "Policier", "Littérature", "Jeunesse", "Dystopie", "Historique", "Philosophie", "Romance"]

  const [ titleFilter, setTitleFilter ] = useState<string>(categoriesTab[0]);

  const filters = categoriesTab.map((filter) => (
    <FilterButton
      key={filter}
      name={filter}
      className="w-full"
      onClick={() => setTitleFilter(filter)}
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
