import ModelFourHero from "../features/home/heroWedget/component/modelFourHero";
import ModelOneHero from "../features/home/heroWedget/component/modelOneHero";
import ModelThreeHero from "../features/home/heroWedget/component/modelThreeHero";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import NewsModelFive from "../features/home/newsWedget.jsx/component/newsModelFive";
import NewsModelOne from "../features/home/newsWedget.jsx/component/newsModelOne";
import NewsModelSix from "../features/home/newsWedget.jsx/component/newsModelSix";
import NewsModelThree from "../features/home/newsWedget.jsx/component/newsModelThree";
import NewsModelTwo from "../features/home/newsWedget.jsx/component/newsModelTwo";

const Home = () => {
  return (
    <div>
      <ModelOneHero />
      <ModelTwoHero />
      <ModelThreeHero />
      <ModelFourHero />
      <NewsModelOne />

      <NewsModelTwo />
      <NewsModelThree />
      <NewsModelFive />
      <NewsModelSix />
    </div>
  );
};
export default Home;
