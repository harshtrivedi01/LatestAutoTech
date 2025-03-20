import React from 'react';
import { useTranslation } from 'react-i18next';

const Content = ({ description }) => {
  const { t } = useTranslation();

  return (
    <div className="container bg-gray-100 p-4 sm:p-6 md:p-10 lg:p-14">
      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black mb-4">
          {t("AboutPooja")}
        </h2>
        <p className="md:text-lg text-gray-900 text-lg font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>
    </div>
  );
}

export default Content;
