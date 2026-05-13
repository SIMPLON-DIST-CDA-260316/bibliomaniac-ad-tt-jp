interface SortSelectProps {
    filterChoice: string
    setFilterChoice: (value: string) => void
}

export default function SortSelect({ filterChoice, setFilterChoice }: SortSelectProps) {
    return (
        <select value={filterChoice} onChange={(e) => setFilterChoice(e.target.value)} className="w-24">
            <option value="">Trier par...</option>
            <option value="title-asc">Par ordre alphabétique</option>
            <option value="title-desc">Par ordre alphabétique décroissant</option>
            <option value="date-desc">Du + récent au - récent</option>
            <option value="date-asc">Du - récent au + récent</option>
            <option value="rating-desc">Du mieux noté au moins noté</option>
            <option value="rating-asc">Du moins noté au mieux noté</option>
        </select>
    )
}