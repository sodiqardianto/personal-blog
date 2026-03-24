export type AdminNoteStatus = "draft" | "published" | "archived";

export type AdminNoteRow = {
  id: string;
  slug: string;
  title: string;
  status: AdminNoteStatus;
  updatedAt: string;
};

export type AdminNotesOverview = {
  publishedCount: number;
  draftCount: number;
  recentNotes: AdminNoteRow[];
};
