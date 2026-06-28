const SingleNewsModelThree = ({ data }) => {
  const imageUrl = data?.banner;
  const title = data?.title;
  const description = data?.description;
  return (
    <div className="relative">
      <div
        className="w-full relative rounded-3xl h-[20rem] bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #002F3C 100%),
            url(${imageUrl})
          `,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-[3rem] right-[2rem] z-20 mt-[2rem]">
          <h1 className="text-white font-[700] lg:text-[2.8rem]  text-[1.7rem]">
            {title}
          </h1>
          <p className="text-white font-[400] text-md">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default SingleNewsModelThree;
