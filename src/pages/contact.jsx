import { HelmetProvider } from "react-helmet-async";
import ContactGrid from "../features/contact/component/contactGrid";
import { useFetchContact } from "../features/contact/hook/useFetchContact";
import MetaHelmet from "../component/metaHelmet/metaHelmet";
import Loader from "../component/loader/loader";
import ErrorMessageNetwork from "../component/errorMessage/errorMessage";
import ScrollToTop from "../component/scrollToTop/scrollToTop";

const Contact = () => {
  const {
    data: contactData,
    isLoading: contactDataLoading,
    error: contactDataError,
  } = useFetchContact();
  if (contactDataLoading) {
    return <Loader />;
  }
  if (contactDataError) {
    return <ErrorMessageNetwork />;
  }
  return (
    <HelmetProvider>
      <ScrollToTop/>
      <MetaHelmet
        title={contactData?.data?.meta_title}
        description={contactData?.data?.meta_description}
      />
      <div>
        <div className="container3 mx-auto mt-[3rem] lg:block hidden">
          <ContactGrid contactData={contactData} />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Contact;
