import Header from "@/components/Header";
import CategoryFilters from "@/components/CategoryFilters";
import MapPlaceholder from "@/components/MapPlaceholder";
import BusinessListPanel from "@/components/BusinessListPanel";
import MobileBusinessSheet from "@/components/MobileBusinessSheet";

export default function Home() {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <Header />
      <CategoryFilters />

      <div className="relative flex min-h-0 flex-1">
        <BusinessListPanel />

        <main className="relative min-h-0 flex-1">
          <MapPlaceholder />
          <MobileBusinessSheet />
        </main>
      </div>
    </div>
  );
}
