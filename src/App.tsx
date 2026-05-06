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
import Giris from "@/pages/Giris";
import SifreSifirla from "@/pages/SifreSifirla";
import NotFound from "@/pages/NotFound";

import PanelLayout from "@/pages/panel/PanelLayout";
import PanelDashboard from "@/pages/panel/PanelDashboard";
import PanelProfile from "@/pages/panel/PanelProfile";
import PanelVerification from "@/pages/panel/PanelVerification";
import PanelLeads from "@/pages/panel/PanelLeads";
import PanelQuotes from "@/pages/panel/PanelQuotes";
import PanelCredits from "@/pages/panel/PanelCredits";

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
      {/* Auth (Agent 3) */}
      <Route path="/giris" element={<Giris />} />
      <Route path="/sifre-sifirla" element={<SifreSifirla />} />
      {/* Lawyer panel (Agent 3) */}
      <Route path="/panel" element={<PanelLayout />}>
        <Route index element={<PanelDashboard />} />
        <Route path="profil" element={<PanelProfile />} />
        <Route path="dogrulama" element={<PanelVerification />} />
        <Route path="talepler" element={<PanelLeads />} />
        <Route path="teklifler" element={<PanelQuotes />} />
        <Route path="krediler" element={<PanelCredits />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
