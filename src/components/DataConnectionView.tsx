"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { getCopy, type Language } from "@/lib/i18n";
import { parseCsvPreview, type CsvPreview } from "@/lib/productFeatures";
import type { DataUpload } from "@/lib/types";
import { DataQualityScorecard } from "./DataQualityScorecard";

const uploadTypeKeys = [
  "workflow_metrics",
  "aggregated_hr",
  "finance_costs",
  "partner_instruction_test",
  "assurance_evidence"
] as const;

const templateHrefs = [
  "/templates/demo-scenarios/conservative-pilot-workflow.csv",
  "/templates/demo-scenarios/medium-pilot-workflow.csv",
  "/templates/demo-scenarios/strong-pilot-workflow.csv",
  "/templates/secure-pilot-upload-sample.xlsx",
  "/templates/verified-ai-gain-calculator-sample.xlsx",
  "/templates/pilot-workflow-metrics.csv",
  "/templates/assumptions-template.json",
  "/templates/contribution-instruction-template.json"
];

type UploadTypeKey = (typeof uploadTypeKeys)[number];

type UploadResponse = {
  ok: boolean;
  upload?: DataUpload;
  uploads?: DataUpload[];
  error?: string;
};

type DataConnectionViewProps = {
  language: Language;
};

export function DataConnectionView({ language }: DataConnectionViewProps) {
  const [uploads, setUploads] = useState<DataUpload[]>([]);
  const [uploadType, setUploadType] = useState<UploadTypeKey>("workflow_metrics");
  const [isUploading, setIsUploading] = useState(false);
  const copy = getCopy(language).dataConnection;
  const [uploadMessage, setUploadMessage] = useState<string>(copy.messages.ready);
  const [csvPreview, setCsvPreview] = useState<CsvPreview | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const templateLabels = copy.templateLinks;

  useEffect(() => {
    setUploadMessage(copy.messages.ready);
  }, [copy.messages.ready]);

  useEffect(() => {
    loadUploads().catch(() => setUploadMessage(copy.messages.unavailable));
  }, [copy.messages.unavailable]);

  async function loadUploads() {
    const response = await fetch("/api/uploads?limit=20", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error(copy.messages.unavailable);

    const payload = (await response.json()) as UploadResponse;
    setUploads(payload.uploads ?? []);
  }

  async function submitUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setUploadMessage(copy.messages.chooseFile);
      return;
    }

    const formData = new FormData();
    formData.append("uploadType", uploadType);
    formData.append("file", file);

    setIsUploading(true);
    setUploadMessage(copy.messages.uploading);

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json()) as UploadResponse;

      if (!response.ok || !payload.upload) {
        throw new Error(payload.error ?? copy.messages.failed);
      }

      const savedUpload = payload.upload;
      setUploads((current) => [savedUpload, ...current].slice(0, 20));
      setUploadMessage(copy.messages.stored);
      setCsvPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : copy.messages.failed);
    } finally {
      setIsUploading(false);
    }
  }

  async function previewFile() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setCsvPreview(null);
      setUploadMessage(copy.messages.chooseFile);
      return;
    }

    if (file.name.toLowerCase().endsWith(".xlsx")) {
      setCsvPreview(null);
      setUploadMessage(copy.messages.excelSelected);
      return;
    }

    try {
      const text = await file.text();
      const preview = parseCsvPreview(text);
      setCsvPreview(preview);
      setUploadMessage(
        preview.readinessScore >= 75
          ? copy.messages.usable
          : copy.messages.needsReview
      );
    } catch {
      setCsvPreview(null);
      setUploadMessage(copy.messages.previewFailed);
    }
  }

  return (
    <div className="dashboard-grid">
      <section className="span-12 section-title">
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
      </section>

      <section className="span-8 panel">
        <h3>{copy.connectionModelTitle}</h3>
        <div className="connection-flow">
          {copy.connectionSteps.map(([title, body], index) => (
            <ConnectionStep key={title} index={`${index + 1}`} title={title} body={body} />
          ))}
        </div>
      </section>

      <aside className="span-4 panel">
        <h3>{copy.privacyTitle}</h3>
        <div className="guardrail-list">
          {copy.guardrails.map((item) => (
            <div className="guardrail-row" key={item}>
              <span aria-hidden="true">!</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </aside>

      <DataQualityScorecard uploads={uploads} language={language} />

      <section className="span-7 panel">
        <div className="upload-head">
          <div>
            <h3>{copy.uploadTitle}</h3>
            <p>
              {copy.uploadBody} <code>data/uploads</code>.
            </p>
          </div>
          <span className="upload-status" aria-live="polite">{uploadMessage}</span>
        </div>

        <form className="upload-form" onSubmit={submitUpload}>
          <label className="stacked-field">
            <span>{copy.datasetType}</span>
            <select
              value={uploadType}
              onChange={(event) => setUploadType(event.target.value as UploadTypeKey)}
            >
              {uploadTypeKeys.map((key, index) => (
                <option key={key} value={key}>
                  {copy.uploadTypes[index][0]}
                </option>
              ))}
            </select>
          </label>

          <label className="stacked-field">
            <span>{copy.fileLabel}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt,.xlsx,text/csv,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={previewFile}
            />
          </label>

          <button className="action-btn primary upload-btn" type="submit" disabled={isUploading}>
            {isUploading ? copy.uploadingButton : copy.uploadButton}
          </button>
        </form>

        <div className="upload-type-note">
          {copy.uploadTypes.map(([label, detail], index) => (
            <p key={uploadTypeKeys[index]}>
              <b>{label}:</b> {detail}
            </p>
          ))}
        </div>

        <CsvMappingPreview preview={csvPreview} language={language} />

        <div className="template-link-row" aria-label="Static data templates">
          {templateLabels.map((label, index) => (
            <a href={templateHrefs[index]} key={templateHrefs[index]}>
              {label}
            </a>
          ))}
        </div>
      </section>

      <aside className="span-5 panel">
        <h3>{copy.connectorTitle}</h3>
        <div className="connector-list">
          {copy.connectorLanes.map(([stage, title, body]) => (
            <article className="connector-card" key={stage}>
              <span>{stage}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </aside>

      <section className="span-12 panel">
        <h3>{copy.recentUploadsTitle}</h3>
        {uploads.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table upload-table">
              <thead>
                <tr>
                  {copy.tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id}>
                    <td>{labelForUploadType(upload.upload_type, language)}</td>
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
            {copy.noUploads}
          </p>
        )}
      </section>
    </div>
  );
}

function CsvMappingPreview({ preview, language }: { preview: CsvPreview | null; language: Language }) {
  const copy = getCopy(language).dataConnection;

  if (!preview) {
    return (
      <div className="mapping-preview empty">
        <h3>{copy.mappingTitle}</h3>
        <p>{copy.mappingEmpty}</p>
      </div>
    );
  }

  return (
    <div className="mapping-preview">
      <div className="mapping-head">
        <div>
          <h3>{copy.mappingTitle}</h3>
          <p>{preview.rows.toLocaleString("en-US")} {copy.rowsDetected}</p>
        </div>
        <div className="mapping-score">
          <span>{copy.readiness}</span>
          <strong>{preview.readinessScore}</strong>
        </div>
      </div>

      <div className="mapping-grid">
        {preview.mappedFields.map((item) => (
          <div className={`mapping-row ${item.source ? "mapped" : ""}`} key={item.field}>
            <b>{item.field}</b>
            <span>{item.source ?? copy.notMapped}</span>
          </div>
        ))}
      </div>

      <div className="red-flag-list">
        {preview.redFlags.map((flag) => (
          <p key={flag}>{flag}</p>
        ))}
      </div>
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

function labelForUploadType(value: string, language: Language) {
  const index = uploadTypeKeys.findIndex((key) => key === value);
  return index >= 0 ? getCopy(language).dataConnection.uploadTypes[index][0] : value;
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
