import ContactGrid from "../features/contact/component/contactGrid";

const Contact = () => {
  return (
    <div>
      <div className="container3 mx-auto mt-[3rem] lg:block hidden">
        <ContactGrid />
      </div>
      <div className="mt-[3rem] lg:hidden block">
        <ContactGrid />
      </div>
    </div>
  );
};

export default Contact;
