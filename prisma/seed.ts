const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const categories = [
      {
        title: "Alimentação",
        color: "#ffff00",
      },
      {
        title: "Moradia",
        color: "#808080",
      },
      {
        title: "Comunicação",
        color: "#3357ff",
      },
      {
        title: "Serviços Públicos",
        color: "#ffffff",
      },
      {
        title: "Transporte",
        color: "#000000",
      },
      {
        title: "Saúde",
        color: "#ef4444",
      },
      {
        title: "Educação",
        color: "#f97316",
      },
      {
        title: "Vestuário",
        color: "#f59e0b",
      },
      {
        title: "Lazer e Entretenimento",
        color: "#eab308",
      },
      {
        title: "Festas e Eventos",
        color: "#84cc16",
      },
      {
        title: "Cuidados Pessoais",
        color: "#22c55e",
      },
      {
        title: "Seguros",
        color: "#10b981",
      },
      {
        title: "Impostos e Taxas",
        color: "#14b8a6",
      },
      {
        title: "Pet",
        color: "#06b6d4",
      },
      {
        title: "Despesas Financeiras",
        color: "#0ea5e9",
      },
      {
        title: "Eletrônicos",
        color: "#3b82f6",
      },
      {
        title: "Presentes",
        color: "#6366f1",
      },
      {
        title: "Doações",
        color: "#8b5cf6",
      },
      {
        title: "Assinaturas e Serviços",
        color: "#a855f7",
      },
      {
        title: "Reformas e Melhorias Domésticas",
        color: "#d946ef",
      },
      {
        title: "Equipamento de trabalho",
        color: "#ec4899",
      },
      {
        title: "Outros",
        color: "#f43f5e",
      },
    ];
    for (const category of categories) {
      await Prisma.categories.create({
        data: {
          title: category.title,
          color: category.color,
        },
      });
    }

    await Prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
