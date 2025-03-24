import React from 'react';
import { useTranslation } from 'react-i18next';

const Content = ({ description }) => {
  const { t } = useTranslation();

  return (
    <div className=" bg-gray-100 p-3 py-5 sm:p-6 md:p-10 lg:p-14">
      <div className="container max-w-7xl  mx-auto ">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
          {t("AboutPooja")}
        </h2>
        <p className="md:text-lg text-gray-900 text-lg font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
}

export default Content;
