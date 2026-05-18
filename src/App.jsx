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
import NotFound from "./component/page_not_found";
import Wrapper from "./component/wrapper/wrapper";
import "./component/i18n"; // Import i18n to ensure it initializes
import Home from "./pages/home";

// Component to handle language sync with URL
function LanguageHandler() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get language from URL param
    let languageToUse = lang;

    // If no language in URL or invalid, get from localStorage or default to 'ar'
    if (!languageToUse || (languageToUse !== "en" && languageToUse !== "ar")) {
      languageToUse = localStorage.getItem("language") || "ar";
    }

    // Change i18n language if needed
    if (i18n.language !== languageToUse) {
      i18n.changeLanguage(languageToUse);
    }

    // Set RTL/LTR direction
    const isArabic = languageToUse === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = languageToUse;

    // Apply ShamelSansOne font for both Arabic and English
    document.documentElement.style.fontFamily = "ShamelSansOne, sans-serif";
    document.documentElement.style.fontWeight = "400";

    // Save to localStorage
    localStorage.setItem("language", languageToUse);

    // Only add language to URL if it's completely missing
    const hasValidLangParam = lang === "en" || lang === "ar";
    const isRootPath = location.pathname === "/" || location.pathname === "";
    const isRootWithNoLang = !hasValidLangParam && isRootPath;

    if (isRootWithNoLang) {
      // Redirect to the correct language path
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

          {/* Add 404 route - this will catch all unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
