import { useTheme } from "../context/ThemeContext";

const ModelTitle = ({ title }) => {
  const {isDarkMode} = useTheme();
  return <h1 className={`lg:text-2xl text-xl font-bold ${isDarkMode?'text-white':'text-[#121C2A]'}`}>{title}</h1>;
};
export default ModelTitle;
