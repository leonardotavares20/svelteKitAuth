export interface GoogleCalendar {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  selected: boolean;
  items: GoogleCalendarItem[];
}

interface GoogleCalendarItem {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}
