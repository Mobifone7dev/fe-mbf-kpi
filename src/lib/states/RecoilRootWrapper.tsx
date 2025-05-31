// app/recoil-provider.tsx hoặc components/RecoilRootWrapper.tsx

'use client';

import { RecoilRoot } from 'recoil';

export default function RecoilProvider({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
