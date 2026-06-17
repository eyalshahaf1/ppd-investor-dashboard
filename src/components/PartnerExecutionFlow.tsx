const executionSteps = [
  ["Customer data", "Aggregated workflow, HR group, finance, and assurance evidence."],
  ["PPD verification", "Net AI costs, apply baseline checks, and exclude disallowed gains."],
  ["Dividend calculation", "Apply confidence haircut and dividend rule to verified value."],
  ["Instruction file/API", "Generate partner-ready contribution instructions only."],
  ["Regulated partner", "Insurer, trust bank, payroll, DC, or benefits provider executes rails."],
  ["Employee account", "Contribution reaches existing regulated retirement infrastructure."]
];

export function PartnerExecutionFlow() {
  return (
    <section className="span-12 panel">
      <div className="section-title">
        <div>
          <h2>Partner execution flow</h2>
          <p>
            The SaaS is the measurement and instruction layer. Funds, accounts,
            and regulated execution stay with licensed partners.
          </p>
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
