import SubscriptionCard from '@/components/onboarding/subscription-card';
import TitleTwo from '@/components/UI/TitleTwo';
import React from 'react';

const SubscriptionPage = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center w-full">
      <TitleTwo>أنت الآن على الخطة المجانية</TitleTwo>
      <div className="flex items-start justify-between w-[71.875rem] gap-10">
        <SubscriptionCard
          title="مجاني"
          description="مناسب لتجريب المنتج واختباره"
          content={['شات مع رفاه', 'تقرير عام للصحة النفسية بدون تفاصيل']}
          buttonText="ابدأ الآن"
          buttonColor="bg-[#736B66]"
          colorBorderDescription="#736B66"
          price="0"
          backgroundCard="bg-[#F5F5F5]"
          spaceTopBtn="mt-[3.125rem]"
        />

        <SubscriptionCard
          title="مدفوع"
          description="استمتع بمميزات باقة الCBT تم تحت إشراف خبراء في علم
النفس"
          content={[
            'التحدث مع رفاه شات و فويس',
            'تقارير مفصلة',
            'تخصيص الدعم النفسي',
            'المتابعه',
            'وكيل للمشاعر',
            'وكيل الصحة النفسية العام',
            'cbt',
            'يدعم اللغه العربية و اللانجليزية',
          ]}
          buttonText="ابدأ الآن"
          buttonColor="bg-[#FB8728]"
          colorBorderDescription="#FB8728"
          price="80"
          backgroundCard="bg-[#FFEDD5]"
          spaceTopBtn="mt-[0.625rem]"
        />
        <SubscriptionCard
          title="أعمال"
          description="باقات مخصصة حسب احتياج الأعمال الخاص بك"
          content={[
            'التحدث مع رفاه',
            'تقارير مفصلة',
            'تخصيص الدعم النفسي',
            'المتابعه',
            'وكيل للمشاعر',
            'وكيل الصحة النفسية العام',
            'cbt',
            'يدعم اللغه العربية و اللانجليزية',
            'جميع المزايا مع تخصيص الاستخدام عبر',
          ]}
          buttonText="تواصل معنا"
          buttonColor="bg-[#534494]"
          colorBorderDescription="#534494"
          backgroundCard="bg-white"
          spaceTopBtn="mt-[1.5625rem]"
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
