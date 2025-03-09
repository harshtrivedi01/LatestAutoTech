import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Viewmore = () => {

const { t } = useTranslation();
  return (
    <div className="flex justify-center">
    <Link href={"/poojabox"}>
      <button className="p-2 px-8 shadow-black shadow-2xl text-lg text-white bg-[#E5644E] rounded-2xl hover:bg-[#7B2502]">
      {t("ViewMore")}
      </button>
    </Link>
  </div>
  );
};

export default Viewmore;
