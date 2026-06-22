import i18next from "i18next";
import NewsCard from "../../../../ui/newsCard";
import TitleSection from "../../../../ui/titleSection";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvertisementSpace from "../../../../assets/images/AdvertisementSpace.png";
import {
  containerVariants,
  CenteredSquareLoader,
} from "../../../../ui/animationNews";
import {
  useFetchPolls,
  useFetchPollsById,
} from "../../heroWedget/hook/useFetchPolls";
import { useVotePoll } from "../../heroWedget/hook/useVotePolls";
import { usePollResults } from "../../heroWedget/hook/useFetchPollResults";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usefetchAds } from "../../heroWedget/hook/useFetchAds";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/dateUtils";

// Poll Component - handles individual poll
const PollComponent = ({ pollId }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const {
    data: pollData,
    isLoading: pollLoading,
    error: pollError,
  } = useFetchPollsById(pollId);
  const {
    data: resultsData,
    isLoading: resultsLoading,
    refetch,
  } = usePollResults(pollId);
  const { mutate: votePoll, isPending: isVotePending } = useVotePoll();

  const handleChoiceChange = (optionId) => {
    setSelectedChoice(optionId);
    setShowResults(false);
  };

  const handleVote = () => {
    if (!selectedChoice) {
      toast.warning(i18next.t("polls.please_select"));
      return;
    }

    votePoll(
      { pollId, pollOptionId: selectedChoice },
      {
        onSuccess: (data) => {
          toast.success(i18next.t("polls.vote_success"));
          setTimeout(() => {
            setShowResults(true);
            refetch();
          }, 1000);
          console.log("Vote successful:", data);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || i18next.t("polls.vote_error"));
          console.error("Vote error:", error);
        },
      },
    );
  };

  const handleShowResults = () => {
    setShowResults(!showResults);
    if (!showResults) {
      refetch();
    }
  };

  if (pollLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (pollError || !pollData?.data) {
    return (
      <p className="text-red-500 text-center">{i18next.t("polls.loading_error")}</p>
    );
  }

  return (
    <div className="mb-6 last:mb-0">
      <p className="text-secondary text-xl mt-4 font-bold">
        {pollData.data.question}
      </p>

      {showResults && resultsData ? (
        <div className="mt-4">
          <div className="space-y-3">
            {resultsData.results?.map((result) => (
              <div key={result.id}>
                <div className="flex justify-between text-sm text-secondary mb-1">
                  <span>{result.title}</span>
                  <span>
                    {result.percentage}% ({result.votes} {i18next.t("polls.votes_count")})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-secondary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-3 text-center">
            {i18next.t("polls.total_votes")} {resultsData.total_votes}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {pollData.data.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`survey_${pollId}`}
                  value={option.id}
                  checked={selectedChoice === option.id}
                  onChange={() => handleChoiceChange(option.id)}
                  disabled={isVotePending}
                  className="w-3 h-3 border border-[#C1C6D6] text-secondary focus:ring-secondary cursor-pointer disabled:opacity-50"
                />
                <span className="text-secondary text-md">{option.title}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleVote}
            disabled={isVotePending || !selectedChoice}
            className="w-full h-[3rem] mt-4 rounded-lg bg-secondary text-md font-bold text-white hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVotePending ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              i18next.t("news_wedget.vote_now")
            )}
          </button>
        </>
      )}

      <button
        onClick={handleShowResults}
        className="w-full text-center text-sm text-secondary hover:text-secondary/80 mt-2 transition"
      >
        {showResults ? i18next.t("polls.hide_results") : i18next.t("polls.show_results")}
      </button>
    </div>
  );
};

// Advertisement Component - handles individual ad
const AdvertisementComponent = ({ adData }) => {
  if (!adData) {
    return (
      <div className="w-full h-[19rem] relative bg-[#E5E7EB] border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-[#9CA3AF] text-xs">{i18next.t("ads.no_ad")}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[19rem] relative rounded-lg overflow-hidden shadow-md">
      <img
        src={adData.image}
        alt="Advertisement"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const NewsModelFive = ({
  data,
  sectionId,
  homePageId,
  currentPage,
  totalPages,
  onPageChange,
  isLoading: externalIsLoading,
  currentLang,
}) => {
  // Fetch all polls
  const {
    data: pollsData,
    isLoading: pollsDataLoading,
    error: pollsDataError,
  } = useFetchPolls();

  // Fetch all ads
  const {
    data: AdsData,
    isLoading: AdsDataLoading,
    error: AdsDataError,
  } = usefetchAds();

  // Filter polls to find the one that matches this section's home_page_id
  const matchingPoll = pollsData?.data?.find(
    (poll) => poll.home_page_id === homePageId,
  );

  // Filter ads to find the one that matches this section's home_page_id
  const matchingAd = AdsData?.data?.find(
    (ad) => ad.home_page_id === homePageId,
  );

  // Get the poll ID from the matching poll
  const pollId = matchingPoll?.id;

  // Get items from API (handle pagination structure)
  const getItemsArray = (items) => {
    if (Array.isArray(items)) {
      return items;
    }
    if (items && items.data && Array.isArray(items.data)) {
      return items.data;
    }
    return [];
  };

  // Extract news items from API data
  const newsItems = getItemsArray(data?.items || []);

  // Map API news items to the format expected by NewsCard
  const news = newsItems.map((item) => ({
    id: item.id,
    image: item.news_image,
    title: item.news_title,
    date: formatDate(item.date , currentLang),
    views: item.views_count,
    type: item.category?.name || i18next.t("news.general_fallback"),
  }));

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1 && !externalIsLoading) {
      onPageChange(sectionId, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !externalIsLoading) {
      onPageChange(sectionId, currentPage + 1);
    }
  };

  // Check if poll is loading
  const isPollLoading = pollsDataLoading;
  const isPollError = pollsDataError;

  // Check if ad is loading
  const isAdLoading = AdsDataLoading;
  const isAdError = AdsDataError;

  // Don't render if no data
  if (!data || (!newsItems.length && !externalIsLoading)) {
    return null;
  }

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={i18next.language === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999 }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="container1 mx-auto mt-[2rem]"
      >
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-[1rem]">
          {/* first column - News with animations */}
          <div className="lg:col-span-8 col-span-1">
            <TitleSection
              title={data.title || i18next.t("news.title_fallback")}
              showArrows={true}
              currentPage={currentPage}
              lastPage={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
              isLoading={externalIsLoading}
            />

            {/* Animated content with centered square loader */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {externalIsLoading ? (
                  <CenteredSquareLoader key="loader" />
                ) : (
                  <motion.div
                    key={currentPage}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="grid md:grid-cols-2 gap-y-[2rem] gap-x-[0.5rem] mt-[1rem]"
                  >
                    {news.map((item, index) => (
                      <Link key={item.id || index} to={`/${currentLang}/News/${item.id}`}>
                        <NewsCard
                          image={item.image}
                          title={item.title}
                          date={item.date}
                          views={item.views}
                          type={item.type}
                        />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* second column - Survey and Advertisement */}
          <div className="lg:col-span-4 col-span-1">
            {/* Survey Section */}
            <div
              style={{ boxShadow: "0px 1px 2px 0px #0000000D" }}
              className="w-full h-auto px-[2rem] py-[2rem] rounded-lg bg-white border border-[#C1C6D6]"
            >
              <h1 className="text-secondary text-md mt-1">{i18next.t("survey")}</h1>

              {isPollLoading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                </div>
              ) : isPollError ? (
                <p className="text-red-500 text-center mt-4">
                  {i18next.t("polls.loading_error")}
                </p>
              ) : pollId ? (
                // Show the matching poll for this section
                <PollComponent key={pollId} pollId={pollId} />
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  {i18next.t("polls.no_poll")}
                </p>
              )}
            </div>

            {/* Advertisement Section - Replaces the static ad space */}
            <div className="mt-[2rem]">
              {isAdLoading ? (
                <div className="w-full h-[19rem] bg-[#E5E7EB] border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
                </div>
              ) : isAdError ? (
                <div className="w-full h-[19rem] bg-[#E5E7EB] border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-red-500 text-xs">
                    {i18next.t("ads.loading_error")}
                  </p>
                </div>
              ) : matchingAd ? (
                // Show the matching ad for this section
                <AdvertisementComponent adData={matchingAd} />
              ) : (
                // Fallback ad placeholder if no matching ad found
                <div className="w-full h-[19rem] relative bg-[#E5E7EB] border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-[#9CA3AF] text-xs">{i18next.t("ads.ad_space")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NewsModelFive;