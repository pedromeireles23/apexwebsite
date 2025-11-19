// Função que simula carregamento lento
async function getHomeData() {
  // Espera 3 segundos antes de continuar
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    title: "Bem-vindo",
    subtitle: "Landing Page com Next.js 16",
  };
}

export default async function Home() {
  // Aguarda os dados (e o delay de 3 segundos)
  const data = await getHomeData();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">{data.title}</h1>
        <p className="text-2xl text-gray-400">{data.subtitle}</p>
      </div>
    </main>
  );
}
