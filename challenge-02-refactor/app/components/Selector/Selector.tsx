import { ChangeEvent } from "react"

interface SelectorProps {
    title: string
    label: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    options: { value: string; label: string }[]
}

const Selector: React.FC<SelectorProps> = ({ title, label, value, onChange, options }) => {
    return(
        <div className="kb-category">
            <label className="kb-label">{label}:</label>
            <select
                value={value}
                onChange={onChange}
                className="kb-select"
                title={title}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default Selector;
