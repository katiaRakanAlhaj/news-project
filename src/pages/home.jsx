import ModelFourHero from "../features/home/heroWedget/component/modelFourHero";
import ModelOneHero from "../features/home/heroWedget/component/modelOneHero";
import ModelThreeHero from "../features/home/heroWedget/component/modelThreeHero";
import ModelTwoHero from "../features/home/heroWedget/component/modelTwoHero";
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
    <div>
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
      {/* <NewsModelEight/> */}
      <NewsModelNine/>
    </div>
  );
};
export default Home;
