"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { DataUpload } from "@/lib/types";
import { DataQualityScorecard } from "./DataQualityScorecard";

const uploadTypes = [
  {
    key: "workflow_metrics",
    label: "Workflow metrics",
    detail: "Throughput, cycle time, volume, error, and rework metrics by workflow."
  },
  {
    key: "aggregated_hr",
    label: "Aggregated HR",
    detail: "Covered employee counts by eligible group, department, or period."
  },
  {
    key: "finance_costs",
    label: "Finance costs",
    detail: "AI costs, overtime savings, outsourcing savings, and implementation costs."
  },
  {
    key: "partner_instruction_test",
    label: "Partner instruction test",
    detail: "Dry-run contribution instruction payloads for regulated partners."
  },
  {
    key: "assurance_evidence",
    label: "Assurance evidence",
    detail: "Evidence extracts for baseline validation and audit review."
  }
] as const;

const connectorLanes = [
  {
    stage: "Pilot",
    title: "Secure CSV upload",
    body: "Fastest path for a 90-day proof of concept."
  },
  {
    stage: "Scale",
    title: "SFTP import/export",
    body: "Standard enterprise transfer for larger employers."
  },
  {
    stage: "Enterprise",
    title: "HRIS, payroll, ERP APIs",
    body: "Automated data sync after security and legal review."
  },
  {
    stage: "Execution",
    title: "Regulated partner API",
    body: "Contribution instructions only; partners execute the rails."
  }
];

const guardrails = [
  "Use aggregated workflow, team, or department-level data wherever possible.",
  "Do not upload national IDs, bank details, pension account numbers, salaries, or secrets.",
  "Do not count involuntary-layoff savings as eligible productivity dividend gains.",
  "Keep customer exports in ignored local storage during the demo and pilot."
];

const templateLinks = [
  ["Workflow CSV template", "/templates/pilot-workflow-metrics.csv"],
  ["Assumptions JSON", "/templates/assumptions-template.json"],
  ["Partner instruction JSON", "/templates/contribution-instruction-template.json"]
];

type UploadTypeKey = (typeof uploadTypes)[number]["key"];

type UploadResponse = {
  ok: boolean;
  upload?: DataUpload;
  uploads?: DataUpload[];
  error?: string;
};

export function DataConnectionView() {
  const [uploads, setUploads] = useState<DataUpload[]>([]);
  const [uploadType, setUploadType] = useState<UploadTypeKey>("workflow_metrics");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("Ready for aggregated pilot data.");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadUploads().catch(() => setUploadMessage("Upload registry unavailable."));
  }, []);

  async function loadUploads() {
    const response = await fetch("/api/uploads?limit=20", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("Upload registry unavailable.");

    const payload = (await response.json()) as UploadResponse;
    setUploads(payload.uploads ?? []);
  }

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setUploadMessage("Choose a CSV or TXT pilot export first.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadType", uploadType);
    formData.append("file", file);

    setIsUploading(true);
    setUploadMessage("Uploading local pilot file...");

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as UploadResponse;

      if (!response.ok || !payload.upload) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      const savedUpload = payload.upload;
      setUploads((current) => [savedUpload, ...current].slice(0, 20));
      setUploadMessage("Stored locally for review.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>Customer data connection</h2>
          <p>Evidence in. Dividend calculation. Partner instructions out.</p>
        </div>
      </section>

      <section className="span-8 panel">
        <h3>Connection model</h3>
        <div className="connection-flow">
          <ConnectionStep
            index="1"
            title="Customer export"
            body="Workflow and cost data."
          />
          <ConnectionStep
            index="2"
            title="PPD verification"
            body="Net AI cost and apply controls."
          />
          <ConnectionStep
            index="3"
            title="Partner instruction"
            body="Contribution instructions only."
          />
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>Privacy guardrails</h3>
        <div className="guardrail-list">
          {guardrails.map((item) => (
            <div className="guardrail-row" key={item}>
              <span aria-hidden="true">!</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </aside>

      <DataQualityScorecard uploads={uploads} />

      <section className="span-7 panel">
        <div className="upload-head">
          <div>
            <h3>Secure pilot upload</h3>
            <p>
              Local CSV/TXT evidence under <code>data/uploads</code>.
            </p>
          </div>
          <span className="upload-status" aria-live="polite">{uploadMessage}</span>
        </div>

        <form className="upload-form" onSubmit={submitUpload}>
          <label className="stacked-field">
            <span>Dataset type</span>
            <select
              value={uploadType}
              onChange={(event) => setUploadType(event.target.value as UploadTypeKey)}
            >
              {uploadTypes.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="stacked-field">
            <span>CSV or TXT file</span>
            <input ref={fileInputRef} type="file" accept=".csv,.txt,text/csv,text/plain" />
          </label>

          <button className="action-btn primary upload-btn" type="submit" disabled={isUploading}>
            {isUploading ? "Uploading" : "Upload pilot data"}
          </button>
        </form>

        <div className="upload-type-note">
          {uploadTypes.map((option) => (
            <p key={option.key}>
              <b>{option.label}:</b> {option.detail}
            </p>
          ))}
        </div>

        <div className="template-link-row" aria-label="Static data templates">
          {templateLinks.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </section>

      <aside className="span-5 panel">
        <h3>SaaS connector roadmap</h3>
        <div className="connector-list">
          {connectorLanes.map(({ stage, title, body }) => (
            <article className="connector-card" key={stage}>
              <span>{stage}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </aside>

      <section className="span-12 panel">
        <h3>Recent local uploads</h3>
        {uploads.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table upload-table">
              <thead>
                <tr>
                  <th>Dataset</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Size</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id}>
                    <td>{labelForUploadType(upload.upload_type)}</td>
                    <td>{upload.original_name}</td>
                    <td>{upload.status.replace(/_/g, " ")}</td>
                    <td>{formatBytes(upload.size_bytes)}</td>
                    <td>{formatDate(upload.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="source-note">
            No uploads yet. The first pilot file will appear here after it is stored locally.
          </p>
        )}
      </section>
    </div>
  );
}

function ConnectionStep({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <article className="connection-step">
      <span>{index}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function labelForUploadType(value: string) {
  return uploadTypes.find((option) => option.key === value)?.label ?? value;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(timestamp));
}
