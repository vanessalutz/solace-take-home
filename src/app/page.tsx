import { Advocate } from "../types/advocate";
import AdvocateTable from "../components/AdvocateTable";

async function getAdvocates(): Promise<Advocate[]> {
  try {
    const res = await fetch("http://localhost:3000/api/advocates");
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return [];
  }
}

export default async function Home() {
  const advocates = await getAdvocates();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Find Your Health Advocate
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with experienced advocates who will champion your healthcare journey
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdvocateTable advocates={advocates} />
      </main>
    </div>
  );
}
