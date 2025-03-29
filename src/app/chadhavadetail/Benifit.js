import { CheckIcon } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Benefit = ({ detail }) => {
  const { t } = useTranslation();

  return (
    <div className="py-10 px-4" id="benefit-section">
      <div className="container max-w-7xl mx-auto">
        <h2 className="title text-black text-start text-2xl md:text-3xl font-bold mb-6">
          {t("Benefitsofofferings")}
        </h2>

        {detail?.benefits_list?.length > 0 ? (
          <ul className="space-y-4">
            {detail?.benefits_list?.map((benefit) => (
              <li
                key={benefit?.id}
                className="flex flex-col sm:flex-row items-start sm:items-center  p-4 rounded-lg shadow-sm"
              >
                <CheckIcon className="text-white bg-orange-400 w-6 h-6 p-1 rounded-full flex-shrink-0 mb-2 sm:mb-0" />
                <div className="flex-1 sm:ml-4 space-y-1">
                  <p
                    className="text-gray-900 font-semibold text-lg"
                    dangerouslySetInnerHTML={{ __html: benefit?.title }}
                  ></p>
                  <p
                    className="text-gray-700 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: benefit?.description }}
                  ></p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">{t("Benefitsofofferings")} N/A</p>
        )}
      </div>
    </div>
  );
};

export default Benefit;
