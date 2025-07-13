export interface Note {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  createdBy: string;
}

export interface NoteToBeCreated {
  title: string;
  content: string;
  createdBy: string;
}

export interface NoteToBeUpdated {
  id: string;
  title: string;
  content: string;
  updatedBy: string;
}
