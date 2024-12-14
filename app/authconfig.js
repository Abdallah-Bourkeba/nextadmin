export const authconfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async authorized({ token, request }) {
      const isLoginedIn = !!token;
      const url = new URL(request.url);
      const isOnDashboard = url.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoginedIn) return true;
        return false;
      } else if (isLoginedIn) {
        return Response.redirect(new URL("/dashboard", request.url));
      }
      return true;
    },
  },
};
