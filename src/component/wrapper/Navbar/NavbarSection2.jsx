import logo from "../../../assets/images/logo.svg";

const NavbarSection2 = () => {
  return (
    <div className="h-[4.5rem]  w-full">
      <div className="container1 mx-auto h-full flex gap-x-[5rem]">
        <div className="flex justify-center items-center h-full">
          <img className="w-[10rem]" src={logo} alt="logo" />
        </div>
        <div className="flex w-full justify-center items-center h-full">
          <div className="w-full h-[3rem] flex items-center justify-center px-4 bg-[#D41515]">
            <p className="text-sm text-white font-[400] leading-relaxed">
              اندلاع حريق كبير في منطقة صناعية يثير حالة من الطوارئ، وفرق
              الإطفاء تحاول السيطرة على النيران. مصادر أولية تشير إلى وقوع
              إصابات بين العمال، وسط عمليات إخلاء مستمرة للموقع. السلطات المحلية
              تفتح تحقيقًا لمعرفة أسباب الحادث وتدعو السكان لتجنب المنطقة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection2;
