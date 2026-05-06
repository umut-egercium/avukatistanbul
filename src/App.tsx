import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Hizmetler from "@/pages/Hizmetler";
import HizmetDetay from "@/pages/HizmetDetay";
import AvukatBul from "@/pages/AvukatBul";
import AvukatProfil from "@/pages/AvukatProfil";
import TalepOlustur from "@/pages/TalepOlustur";
import RequestSuccess from "@/pages/RequestSuccess";
import Taleplerim from "@/pages/Taleplerim";
import AvukatKayit from "@/pages/AvukatKayit";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hizmetler" element={<Hizmetler />} />
      <Route path="/hizmetler/:slug" element={<HizmetDetay />} />
      <Route path="/avukat-bul" element={<AvukatBul />} />
      <Route path="/avukat-bul/:district" element={<AvukatBul />} />
      <Route path="/avukat/:slug" element={<AvukatProfil />} />
      {/* Customer flow (Agent 2) */}
      <Route path="/talep-olustur" element={<TalepOlustur />} />
      <Route path="/talep-basarili" element={<RequestSuccess />} />
      <Route path="/taleplerim" element={<Taleplerim />} />
      <Route path="/avukat-kayit" element={<AvukatKayit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
