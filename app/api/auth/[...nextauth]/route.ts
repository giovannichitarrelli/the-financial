// export { GET, POST } from "@/services/auth";
// import { authOptions } from "@/services/auth"
// import NextAuth from "next-auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// export { handler as GET, handler as POST }  from "@/services/auth";

import { auth } from "@/services/auth";
import NextAuth from "next-auth";

const handler = NextAuth(auth);

export { handler as GET, handler as POST };
