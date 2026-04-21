// Default Tally-like Form Builder Template
export const DEFAULT_MICROSAAS_TEMPLATE = {
    name: "FormBuilder",
    description: "Create and manage custom forms with ease",
    icon: "FileText",
    color: "#3b82f6",
    resources: [
        {
            name: "Forms",
            fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "text", required: false },
                { name: "status", type: "text", required: true, default: "draft" },
                { name: "published", type: "boolean", required: true, default: false },
                { name: "created_at", type: "date", required: true }
            ]
        },
        {
            name: "Responses",
            fields: [
                { name: "form_id", type: "text", required: true },
                { name: "respondent_email", type: "text", required: false },
                { name: "response_data", type: "json", required: true },
                { name: "submitted_at", type: "date", required: true }
            ]
        },
        {
            name: "Questions",
            fields: [
                { name: "form_id", type: "text", required: true },
                { name: "question_text", type: "text", required: true },
                { name: "question_type", type: "text", required: true },
                { name: "required", type: "boolean", required: true, default: false },
                { name: "order", type: "number", required: true }
            ]
        }
    ],
    views: [
        {
            id: "forms-list",
            type: "list",
            label: "All Forms",
            resourceId: "Forms",
            columns: ["title", "status", "published", "created_at"]
        },
        {
            id: "form-create",
            type: "form",
            label: "Create Form",
            resourceId: "Forms",
            fields: ["title", "description", "status"]
        },
        {
            id: "form-detail",
            type: "detail",
            label: "Form Details",
            resourceId: "Forms",
            layout: "single-column"
        },
        {
            id: "responses-list",
            type: "list",
            label: "Form Responses",
            resourceId: "Responses",
            columns: ["respondent_email", "submitted_at"]
        }
    ],
    flows: [
        {
            id: "main-flow",
            nodes: [
                {
                    id: "schema-forms",
                    type: "schema",
                    position: { x: 100, y: 100 },
                    data: {
                        label: "Forms",
                        type: "database",
                        fields: [
                            { name: "title", type: "text" },
                            { name: "description", type: "text" },
                            { name: "status", type: "text" },
                            { name: "published", type: "boolean" },
                            { name: "created_at", type: "date" }
                        ]
                    }
                },
                {
                    id: "schema-responses",
                    type: "schema",
                    position: { x: 100, y: 300 },
                    data: {
                        label: "Responses",
                        type: "database",
                        fields: [
                            { name: "form_id", type: "text" },
                            { name: "respondent_email", type: "text" },
                            { name: "response_data", type: "json" },
                            { name: "submitted_at", type: "date" }
                        ]
                    }
                },
                {
                    id: "schema-questions",
                    type: "schema",
                    position: { x: 100, y: 500 },
                    data: {
                        label: "Questions",
                        type: "database",
                        fields: [
                            { name: "form_id", type: "text" },
                            { name: "question_text", type: "text" },
                            { name: "question_type", type: "text" },
                            { name: "required", type: "boolean" },
                            { name: "order", type: "number" }
                        ]
                    }
                },
                {
                    id: "list-forms",
                    type: "list",
                    position: { x: 450, y: 100 },
                    data: {
                        label: "All Forms",
                        resourceId: "schema-forms"
                    }
                },
                {
                    id: "form-create",
                    type: "form",
                    position: { x: 450, y: 250 },
                    data: {
                        label: "Create Form",
                        resourceId: "schema-forms"
                    }
                },
                {
                    id: "detail-form",
                    type: "detail",
                    position: { x: 450, y: 400 },
                    data: {
                        label: "Form Details",
                        resourceId: "schema-forms",
                        layout: "single-column"
                    }
                }
            ],
            edges: [
                { id: "e1", source: "schema-forms", target: "list-forms" },
                { id: "e2", source: "schema-forms", target: "form-create" },
                { id: "e3", source: "schema-forms", target: "detail-form" }
            ]
        }
    ]
}
