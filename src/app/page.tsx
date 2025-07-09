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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <AdvocateTable advocates={advocates} />
    </main>
  );
}
