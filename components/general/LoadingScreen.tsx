import React from 'react';
import Image from 'next/image';

const LoadingScreen = () => {
  return (
    <main
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-primary"
      role="status"
      aria-label="Loading page"
    >
      <div className="flex flex-col items-center space-y-3">
        <Image
          src="/kwisi.svg"
          alt="Wujugar Logo"
          width={80}
          height={80}
          priority
          className="h-20 w-20 animate-bounce"
        />

        <h1 className="text-2xl font-bold tracking-tight text-white">
          Wujugar
        </h1>
      </div>
    </main>
  );
};

export default LoadingScreen;
