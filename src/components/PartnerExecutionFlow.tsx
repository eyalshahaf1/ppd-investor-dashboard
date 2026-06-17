const executionSteps = [
  ["Customer data", "Aggregated workflow evidence."],
  ["PPD verification", "Net costs and baseline checks."],
  ["Dividend calculation", "Rule applied to verified value."],
  ["Instruction file/API", "Partner-ready instructions."],
  ["Regulated partner", "Licensed rail executes."],
  ["Employee account", "Existing pension infrastructure."]
];

export function PartnerExecutionFlow() {
  return (
    <section className="span-12 panel">
      <div className="section-title">
        <div>
          <h2>Partner execution flow</h2>
          <p>Measurement layer only. Licensed partners execute funds and accounts.</p>
        </div>
      </div>

      <div className="execution-flow" role="img" aria-label="Partner execution flow diagram">
        {executionSteps.map(([title, body], index) => (
          <div className="execution-node-wrap" key={title}>
            <article className="execution-node">
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
            {index < executionSteps.length - 1 && <div className="execution-arrow" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </section>
  );
}
