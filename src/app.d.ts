// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        id: string;
        name: string;
        role: string;
        loginProvider: string;
      };
      calendar: {
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
      };
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
