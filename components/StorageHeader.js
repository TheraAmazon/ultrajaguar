import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { MicrophoneIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import UltraJaguar from '../public/UltraJaguar.png';
import SearchHeaderOptions from './SearchHeaderOptions';
import Link from 'next/link';
import Header from './Header';

export default function StorageHeader() {
  const router = useRouter();
  const searchInputRef = useRef(null);
  function search(event) {
    event.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;
    router.push(`/search?term=${term.trim()}&searchType=`);
  }
  return (
    <header className="sticky top-0 bg-white">
      <Header />
      <div className="flex justify-center">
        <Image
          onClick={() => router.push('/')}
          width="500"
          objectFit="contain"
          height="216"
          className="cursor-pointer"
          src={UltraJaguar}
        />
      </div>
      <div className="flex flex-col space-y-3 px-8">
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 p-6 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <a className="mr-2 font-bold">
              Welcome to our blockchain storage box, to post your documents you
              will need a wallet and some Xdai. Follow these steps to create
              your crypto NFT Free!
            </a>
          </div>
        </div>
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 p-6 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <Link href="https://metamask.io/download/">
              <a className="mr-2 font-bold text-yellow-600">
                🦊 1. Download your crypto wallet
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <Link href="https://chainlist.org/chain/300">
              <a className="mr-2 font-bold text-blue-600">
                🌐 2. Add chain to your wallet
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <Link href="https://www.gimlu.com/faucet">
              <a className="mr-2 font-bold text-green-600">
                🪙 3. Copy your wallet address and get some Optimism on GC(XDAI)
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <Link href="/ultra-post">
              <a className="mr-2 font-bold text-red-600">
                🐆 4. Post your Crypto Jaguar document
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-center rounded-lg border border-gray-200 shadow-lg px-6 py-3 flex-grow max-w-8xl items-center space-x-4">
          <div className="flex w-full items-center">
            <Link href="/ultra-post">
              <a className="mr-2 font-bold text-purple-600">
                🛰 5. Click on your post and open new tab to see!
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
