import React from "react";
import { useTranslation } from "react-i18next";

const PoojaProcess = ({ detail }) => {
  const { t } = useTranslation();

  return (
    <div id="process-section" className="py-10">
      <div className="container max-w-7xl mx-auto">
        <h2 className="title mb-6">{t("PoojaProcess")}</h2>

        {detail?.process ? (
          <div
            className="bg-white p-6 rounded-lg  text-gray-800 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: detail.process }}
          />
        ) : (
          <p className="text-gray-500">{t("NoProcessAvailable")}</p>
        )}
      </div>
    </div>
  );
};

export default PoojaProcess;
