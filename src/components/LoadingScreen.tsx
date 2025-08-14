import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center animate-pulse">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczOaKawDXoEOBqw1IJmYtMUxQ3bB_CtiQ_SC5D0M0BfEU7G0efxHOoCtt2uw6lVNv1nezoycIqF1NyzeruFW_JgPk36xfUA62gthvjww1ejrQW_-yMm6S0UEBGn9EepJdeUzaMYAQXZvgK8Fcp718w7j=w1277-h1280-s-no-gm?authuser=1"
          alt="Indian Dosa Logo"
          className="w-32 h-32 mx-auto mb-4 object-contain animate-bounce"
        />
        <div className="w-16 h-1 bg-accent mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};