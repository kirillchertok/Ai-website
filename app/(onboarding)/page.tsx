import InfoCard from '@/components/onboarding/info-card';
import TermsAgreement from '@/components/onboarding/terms-agreement';
import Button from '@/components/UI/button';
import Container from '@/components/UI/Container';
import TitleOne from '@/components/UI/TitleOne';
import TitleTwo from '@/components/UI/TitleTwo';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OnboardingPage = () => {
  return (
    <Container className="h-full">
      <section className="grid md:grid-cols-2 gap-8 xs:gap-10 sm:gap-11 xl:gap-0 justify-center items-center">
        <div className="flex-1 flex flex-col gap-8 xs:gap-10 sm:gap-11 2xl:gap-11 md:order-1 order-2">
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
              animationDelay="0ms"
            />
            <InfoCard
              description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر."
              animationDelay="200ms"
            />
            <InfoCard
              description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر."
              animationDelay="400ms"
            />
            <InfoCard
              description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر."
              animationDelay="600ms"
            />
            <InfoCard
              description="قد تؤدي بعض التعليمات إلى نتائج غير ملائمة أو متحيزة في سياق الصحة النفسية، مما يستدعي ضرورة التقييم المستمر."
              animationDelay="800ms"
            />
          </div>
          <TermsAgreement />
        </div>
        <div className="flex-1 flex items-center justify-end md:order-2 order-1 animate-slideInFromRight">
          <Image
            src="/images/onboarding.svg"
            width={656}
            height={410}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    </Container>
  );
};

export default OnboardingPage;
