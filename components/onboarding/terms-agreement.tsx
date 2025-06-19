'use client';

import Button from '@/components/UI/button';
import Link from 'next/link';
import { useState } from 'react';

const TermsAgreement = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-8">
      <label className="container mb-3 xs:mb-4 sm:mb-5 md:mb-6 block text-sm xs:text-base sm:text-lg">
        أوافق على الأحكام والشروط
        <input
          type="checkbox"
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
        />
        <span className="checkmark"></span>
      </label>

      {isChecked ? (
        <Link href="/subscription-page">
          <Button
            bgColor="bg-[#907DE0]"
            className="w-full xs:w-full sm:w-[20rem] md:w-[22rem] lg:w-[23.5rem] h-[3rem] xs:h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem] lg:h-[4rem] py-2 xs:py-2.5 sm:py-3 md:py-3.5 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 font-bold xs:font-extrabold leading-[100%] hover:bg-[#8775d6]"
            icon="/images/arrow_right.svg"
            content="ابدأ الآن"
            type="button"
          />
        </Link>
      ) : (
        <Button
          bgColor="bg-gray-400"
          className="w-full xs:w-full sm:w-[20rem] md:w-[22rem] lg:w-[23.5rem] h-[3rem] xs:h-[3.25rem] sm:h-[3.5rem] md:h-[3.75rem] lg:h-[4rem] py-2 xs:py-2.5 sm:py-3 md:py-3.5 px-4 xs:px-5 sm:px-6 md:px-7 lg:px-8 font-bold xs:font-extrabold leading-[100%] cursor-not-allowed hover:scale-none"
          icon="/images/arrow_right.svg"
          content="ابدأ الآن"
          type="button"
        />
      )}
    </div>
  );
};

export default TermsAgreement;
