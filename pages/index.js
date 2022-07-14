import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import UltraJaguar from '../public/UltraJaguar.png';
import { SearchIcon, MicrophoneIcon } from '@heroicons/react/solid';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Link from 'next/link';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function Home() {
  const router = useRouter();
  const searchInputRef = useRef(null);
  function search(event) {
    event.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;
    router.push(`/search?query=${term.trim()}`);
  }
  async function randomSearch(event) {
    event.preventDefault();
    const randomTerm = await fetch(
      'https://random-word-api.herokuapp.com/word?number=1'
    ).then((response) => response.json());
    if (!randomTerm) return;
    router.push(`/search?term=${randomTerm}`);
  }

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      );
    }
  }, []);

  return (
    <div>
      <Header />

      <form className="flex flex-col items-center mt-36">
        <Image
          width="1080"
          objectFit="cover"
          height="303"
          src={UltraJaguar}
          alt="Teaching humanity and the animals"
        />
        <div className="flex md:flex">
          <span className="inline-block p-1 text-green-700 bg-green-100 rounded-xl md:mx-4 dark:text-white dark:bg-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </span>

          <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">
            Fast, secure and Green!
          </h1>
        </div>
        <div className="flex w-full mt-5 mx-auto max-w-[90%] border border-green-600 hover:shadow-lg focus-within:shadow-lg px-5 py-3 rounded-full items-center sm:max-w-xl lg:max-w-2xl">
          <SearchIcon className="h-5 text-green-600 mr-3" />
          <input
            ref={searchInputRef}
            type="text"
            className="flex-grow focus:outline-none"
          />
          <MicrophoneIcon className="h-5 text-green-600 mr-3" />
        </div>
      </form>
      <div className="flex justify-center p-5 text-sm text-green-600 flex space-x-4">
        <div className="bg-orange-500 hover:bg-orange-600 px-5 py-4 font-bold text-white rounded rounded-tr-2xl rounded-bl-2xl">
          <button onClick={search}>Ultra Search</button>
        </div>
        <form
          className="flex flex-col items-center"
          action="/api/checkout_sessions"
          method="POST"
        >
          <button
            className="bg-green-600 hover:bg-green-700 px-5 py-4 font-bold text-white rounded rounded-tr-2xl rounded-bl-2xl"
            type="submit"
            role="link"
          >
            Help the Rainforest
          </button>
        </form>
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
}
