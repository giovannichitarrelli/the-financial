export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        // priceId: "price_1PJInsJPcepMZEYbvLFwOxQ0",
        priceId: "price_1PJLhlJPcepMZEYbw0ONVazb",
      },
      pro: {
        // priceId: "price_1PJOuLJPcepMZEYbLVLqjY4j",
        priceId: "price_1PJLgyJPcepMZEYbOr69KWfF",
      },
    },
  },
};
