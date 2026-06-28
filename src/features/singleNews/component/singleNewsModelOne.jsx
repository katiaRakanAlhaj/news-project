const SingleNewsModelOne = ({ data }) => {
  // data is already the individual content item from news_contents
  const imageUrl = data?.banner || data?.image || '';
  const title = data?.title || '';

  return (
    <div className="relative">
      <div
        className="w-full relative rounded-3xl h-[20rem] bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #002F3C 100%),
            url(${imageUrl})
          `,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="text-white font-[700] lg:text-[2.8rem] mt-[2rem] lg:mt-0 absolute bottom-[3rem] right-[2rem] text-[1.7rem]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default SingleNewsModelOne;