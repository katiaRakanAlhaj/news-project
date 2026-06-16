import ContactGrid from "../features/contact/component/contactGrid";
import { useFetchContact } from "../features/contact/hook/useFetchContact";

const Contact = () => {
  const {data:contactData , isLoading:contactDataLoading , error:contactDataError} = useFetchContact();
  return (
    <div>
      <div className="container3 mx-auto mt-[3rem] lg:block hidden">
        <ContactGrid contactData = {contactData}/>
      </div>
  
    </div>
  );
};

export default Contact;
