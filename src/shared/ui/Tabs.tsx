interface TabsProps {
  tabs: string[]
  value: string
  onChange: (tab: string) => void
}

export default function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="flex border-y border-gray-200">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-2 text-sm text-center ${i < tabs.length - 1 ? "border-r border-gray-200" : ""} ${
            value === tab ? "font-semibold text-primary" : "text-text/50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
