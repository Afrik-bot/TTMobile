import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import LanguageSelector from '../components/LanguageSelector';

export default function Auth() {
  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center border border-gray-700/50 shadow-xl">
            <span className="text-2xl font-bold text-white">TT</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-400">
            Tam Tam
          </h2>
        </div>

        <div className="mt-8">
          <AuthForm />
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}