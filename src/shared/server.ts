import { makeServer } from "../screens/server";

export function generateFakeUsersData() {
  if (process.env.NODE_ENV === 'development') {
    if (window.server) {
      window.server.shutdown();
    }
    window.server = makeServer();
  }
}
