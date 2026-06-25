import { useTheme } from "../context/ThemeContext";

const ModelTitle = ({ title }) => {
  const {isDarkMode} = useTheme();
  return <h1 className={`lg:text-2xl text-xl font-bold ${isDarkMode?'text-white':'text-primary'}`}>{title}</h1>;
};
export default ModelTitle;
