'use client';

import { EditorInput } from '../../atoms/EditorInput';
import { CollapseSection } from '../../molecules/CollapseSection';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'other';
}

interface ResourcePropertiesPanelProps {
  nodeId: string;
  resources: Resource[];
  onResourceAdd: () => void;
  onResourceUpdate: (resourceId: string, updates: Partial<Resource>) => void;
  onResourceDelete: (resourceId: string) => void;
}

export function ResourcePropertiesPanel({
  nodeId,
  resources,
  onResourceAdd,
  onResourceUpdate,
  onResourceDelete,
}: ResourcePropertiesPanelProps) {
  return (
    <div className="w-68 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Resource Properties</h3>
        <button
          type="button"
          onClick={onResourceAdd}
          className="text-primary-500 hover:bg-primary-50 focus:ring-primary-500 rounded-md p-1 focus:ring-2 focus:outline-none"
          aria-label="Add resource"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Node Info */}
      <CollapseSection title="Node Info" defaultOpen={false}>
        <EditorInput
          label="Node ID"
          value={nodeId}
          disabled
          className="bg-neutral-50"
          aria-label="Node ID (read-only)"
        />
      </CollapseSection>

      {/* Resources List */}
      <CollapseSection title={`Resources (${resources.length})`} defaultOpen>
        {resources.length === 0 ? (
          <p className="text-sm text-neutral-400">No resources added yet</p>
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="space-y-2 rounded-md border border-neutral-200 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-700">
                    Resource #{resource.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => onResourceDelete(resource.id)}
                    className="focus:ring-primary-500 rounded-md p-1 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:outline-none"
                    aria-label={`Delete resource ${resource.id}`}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <EditorInput
                  label="Title"
                  value={resource.title}
                  onChange={(e) => onResourceUpdate(resource.id, { title: e.target.value })}
                  placeholder="Resource title"
                  maxLength={100}
                />
                <EditorInput
                  label="URL"
                  value={resource.url}
                  onChange={(e) => onResourceUpdate(resource.id, { url: e.target.value })}
                  placeholder="https://example.com"
                  type="url"
                />
                <div className="flex flex-col gap-1">
                  <label
                    className="text-xs font-medium text-neutral-700"
                    htmlFor={`resource-type-${resource.id}`}
                  >
                    Type
                  </label>
                  <select
                    id={`resource-type-${resource.id}`}
                    value={resource.type}
                    onChange={(e) =>
                      onResourceUpdate(resource.id, {
                        type: e.target.value as Resource['type'],
                      })
                    }
                    className="focus:border-primary-500 focus:ring-primary-500 h-9 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                  >
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="course">Course</option>
                    <option value="book">Book</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </CollapseSection>
    </div>
  );
}
