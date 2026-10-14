import { WebsiteHamster } from '@/repositories/hamster-repository';
import React from 'react';
import ProductSection from '../home/ProductSection';

type HamsterProps = {
  hamsters: WebsiteHamster[];
};

const Hamsters = ({ hamsters }: HamsterProps) => {
  return (
    <ProductSection
      title="ဟမ်းဟမ်းလေးများ"
      products={hamsters}
      emptyMessage="ဖေဖေ မေမေတို့ မွေးစားဖို့ ဟမ်းဟမ်းလေးများ မရှိသေးပါ။"
    />
  );
};

export default Hamsters;
