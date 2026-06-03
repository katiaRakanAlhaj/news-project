import ModelFourHero from "../features/home/heroWedget/component/modelFourHero";
import ModelOneHero from "../features/home/heroWedget/component/modelOneHero";
import ModelThreeHero from "../features/home/heroWedget/component/modelThreeHero";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
import MediaModelOne from "../features/home/mediaWedget/component/mediaModelOne";
import MediaModelTwo from "../features/home/mediaWedget/component/mediaModelTwo";
import NewsModelEight from "../features/home/newsWedget.jsx/component/newsModelEight";
import NewsModelFive from "../features/home/newsWedget.jsx/component/newsModelFive";
import NewsModelFour from "../features/home/newsWedget.jsx/component/newsModelFour";
import NewsModelNine from "../features/home/newsWedget.jsx/component/newsModelNine";
import NewsModelOne from "../features/home/newsWedget.jsx/component/newsModelOne";
import NewsModelSeven from "../features/home/newsWedget.jsx/component/newsModelSeven";
import NewsModelSix from "../features/home/newsWedget.jsx/component/newsModelSix";
import NewsModelThree from "../features/home/newsWedget.jsx/component/newsModelThree";
import NewsModelTwo from "../features/home/newsWedget.jsx/component/newsModelTwo";

const Home = () => {
  return (
    <div className="lg:mt-0 mt-[6rem]">
      <ModelOneHero />
      <ModelTwoHero />
      <ModelThreeHero />
      <ModelFourHero />
      <NewsModelOne />
      <NewsModelTwo />
      <NewsModelThree />
      <NewsModelFour />
      <NewsModelFive />
      <NewsModelSix />
      <NewsModelSeven />
      <NewsModelEight />
      <NewsModelNine />
      <MediaModelOne />
      <MediaModelTwo />
    </div>
  );
};
export default Home;
