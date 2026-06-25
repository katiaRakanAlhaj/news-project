// App.jsx
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useParams,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./component/page_not_found";
import Wrapper from "./component/wrapper/wrapper";
import "./component/i18n";
import Home from "./pages/home";
import Contact from "./pages/contact";
import AboutUs from "./pages/aboutUs";
import News from "./pages/news";
import SingleNews from "./pages/singleNews";
import { ColorProvider } from "./context/colorContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      refetchIntervalInBackground: true,
      retry: 2,
      networkMode: "always",
    },
  },
});

function LanguageHandler() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let languageToUse = lang;

    if (!languageToUse || (languageToUse !== "en" && languageToUse !== "ar")) {
      languageToUse = localStorage.getItem("language") || "ar";
    }

    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    }

    const isArabic = languageToUse === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = languageToUse;

    if (isArabic) {
      document.documentElement.style.fontFamily = "ShamelSansOne, sans-serif";
    } else {
      document.documentElement.style.fontFamily = "sans-serif";
    }
    
    document.documentElement.style.fontWeight = "400";
    localStorage.setItem("language", languageToUse);

    const hasValidLangParam = lang === "en" || lang === "ar";
    const isRootPath = location.pathname === "/" || location.pathname === "";
    const isRootWithNoLang = !hasValidLangParam && isRootPath;

    if (isRootWithNoLang) {
      navigate(`/${languageToUse}`, { replace: true });
    }
  }, [lang, i18n, navigate, location.pathname]);

  return <Outlet />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<LanguageHandler />}>
        <Route path="/:lang?" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="About_Us" element={<AboutUs />} />
          <Route path="category/:id" element={<News />} />
          <Route path="News/:id" element={<SingleNews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ColorProvider> 
        <RouterProvider router={router} />
      </ColorProvider>
    </QueryClientProvider>
  );
}

export default App;