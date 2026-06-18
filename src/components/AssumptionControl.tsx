type AssumptionControlProps = {
  name: string;
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export function AssumptionControl({
  name,
  label,
  help,
  value,
  min,
  max,
  step,
  onChange
}: AssumptionControlProps) {
  const update = (nextValue: string) => {
    const numeric = Number(nextValue);
    if (Number.isFinite(numeric)) onChange(numeric);
  };

  return (
    <div className="field">
      <label>
        <span>{label}</span>
        <small title={help}>{help}</small>
      </label>
      <div className="control-row">
        <input
          data-assumption={`${name}-range`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => update(event.target.value)}
        />
        <input
          data-assumption={name}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => update(event.target.value)}
        />
      </div>
    </div>
  );
}
