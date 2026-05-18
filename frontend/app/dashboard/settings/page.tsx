"use client";

import React, { useState, useEffect } from "react";
import { SyncBadge } from "@/components/SyncBadge";

export default function SettingsPage() {
  const [density, setDensity] = useState(24);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Layout Adjustment Controls (mutates global CSS variables)
  useEffect(() => {
    document.documentElement.style.setProperty('--spacing-bento-gap', `${density}px`);
  }, [density]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setUploadedFile(file);
      } else {
        alert("Please upload a valid CSV file.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="mb-4">
        <h1 className="font-headline-lg text-on-surface mb-2">
          Customization Engine
        </h1>
        <p className="font-body-lg text-on-surface-variant">
          System overrides, variable injection, and legacy manual imports.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-[var(--spacing-bento-gap)]">
        
        {/* Layout Adjustments Controls */}
        <div className="bento-card col-span-12 xl:col-span-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">
              tune
            </span>
            <h2 className="font-headline-md text-primary">Display Variables</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-on-surface-variant flex justify-between">
                <span>GRID_GUTTER_DENSITY</span>
                <span className="text-primary">{density}px</span>
              </label>
              <input
                type="range"
                min="8"
                max="48"
                step="4"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-primary bg-surface-container h-2 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-on-surface-variant flex justify-between">
                <span>UI_SCALE_FACTOR</span>
                <span className="text-primary">1.0x</span>
              </label>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.1"
                defaultValue="1"
                className="w-full accent-primary bg-surface-container h-2 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* File Processing Engine (CSV Drag and Drop) */}
        <div className="bento-card col-span-12 xl:col-span-6 flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary text-2xl">
                upload_file
              </span>
              <h2 className="font-headline-md text-secondary">Manual Ingestion</h2>
            </div>
          </div>
          <p className="font-body-sm text-on-surface-variant">
            Drop CSV payloads to manually patch historical metric gaps.
          </p>

          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full h-32 mt-2 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
              isDragging 
                ? "border-primary bg-primary/10" 
                : "border-stroke-glass bg-surface-container hover:border-on-surface-variant/50 hover:bg-surface-variant/30"
            }`}
          >
            {uploadedFile ? (
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-2">check_circle</span>
                <span className="font-label-mono text-primary">{uploadedFile.name}</span>
                <span className="font-body-sm text-on-surface-variant mt-1 text-xs">{(uploadedFile.size / 1024).toFixed(2)} KB</span>
              </div>
            ) : (
              <div className="flex flex-col items-center pointer-events-none">
                <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-2">cloud_upload</span>
                <span className="font-label-mono text-on-surface-variant">DRAG .CSV PAYLOAD HERE</span>
              </div>
            )}
          </div>
          
          {uploadedFile && (
            <button className="w-full mt-2 py-3 rounded-lg bg-surface-container border border-primary/30 text-primary font-label-mono hover:bg-primary/20 transition-colors">
              EXECUTE INGESTION SEQUENCE
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
