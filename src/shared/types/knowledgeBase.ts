export interface KnowledgeDocument {
  db: string;
  id: string;
  filename: string;
}

export interface KnowledgeDocumentDetail extends KnowledgeDocument {
  content: string;
}

export interface UpdateKnowledgeParams {
  content: string;
  filename: string;
}

export interface UpdateKnowledgeDocumentResponse {
  db: string;
  old_file_id: string;
  new_file_id: string;
  filename: string;
  status: string;
}