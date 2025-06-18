import InfoCard from '@/components/onboarding/info-card';
import Button from '@/components/UI/button';
import TitleOne from '@/components/UI/TitleOne';
import TitleTwo from '@/components/UI/TitleTwo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OnboardingPage = () => {
  return (
    <section className="flex flex-row-reverse justify-center items-center">
      <div className="flex-1 flex items-center justify-end">
        <Image
          src="/images/onboarding.svg"
          width={656}
          height={410}
          alt="logo"
        />
      </div>
      <div className="flex-1 flex flex-col gap-11">
        <div>
          <TitleOne>مرحبًا محمود</TitleOne>
          <div className="flex items-center gap-4 mt-4">
            <Image src="/images/logo.svg" width={44} height={44} alt="logo" />
            <TitleTwo>أنا رفاه</TitleTwo>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InfoCard
            title="شروط وأحكام"
            description="أنا أداة ذكاء اصطناعي تهدف إلى دعمك في تعزيز صحتك النفسية، لكنني لا أستطيع أن أكون بديلاً عن المتخصصين النفسيين. إذا كنت تواجه أزمة، يُفضل أن تستعين بمختص نفسي."
            icon="/images/exclamation.svg"
          />
          <InfoCard description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر." />
          <InfoCard description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر." />
          <InfoCard description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر." />
          <InfoCard description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر." />
        </div>
        <div className="">
          <label className="container">
            أوافق على الأحكام والشروط
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
          <Link href={`/subscription-page`}>
            <Button
              bgColor="bg-[#907DE0]"
              className="w-[23.5rem] h-[4rem] py-3.5 px-8 text-lg leading-[100%] font-extrabold"
              icon={'/images/arrow_right.svg'}
              content="ابدأ الآن"
              type="button"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPage;
