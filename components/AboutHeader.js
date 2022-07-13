import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AboutHeader() {
  const router = useRouter();
  return (
    <header className="flex justify-between p-5 text-sm text-gray-700 flex space-x-4">
      <div className="flex space-x-4 items-center">
        <Link href="/">
          <a className="link">Home</a>
        </Link>
        <Link href="https://store.google.com/">
          <a className="link">Store</a>
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        {/* <Link href="https://mail.google.com">
            <a className="link">Gmail</a>
          </Link> */}

        <Link href="/crypto-storage">
          <a className="flex space-x-4 items-center">Crypto Jaguar</a>
        </Link>
      </div>
    </header>
  );
}
