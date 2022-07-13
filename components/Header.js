import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  return (
    <header className="flex justify-end p-5 text-md text-gray-700 flex space-x-4 ">
      <div className="flex space-x-4 items-center"></div>
      <div className="flex space-x-4 items-center ">
        <div className="dropdown dropdown-end">
          <label
            tabIndex="0"
            className="bg-green-600 hover:bg-green-700 btn m-1 font-bold text-white rounded rounded-tr-2xl rounded-bl-2xl"
          >
            Ultra menu
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 text-orange-500 font-bold rounded-box w-52"
          >
            <li>
              <Link href="/">
                <a className="link">Ultra Jaguar</a>
              </Link>
            </li>
            <li>
              <Link href="/ultra-storage">
                <a className="link">Ultra Storage</a>
              </Link>
            </li>
            <li>
              <Link href="/ultra-storage">
                <a className="link">PikBlock</a>
              </Link>
            </li>
            <li>
              <Link href="https://amazonsaviors.com/">
                <a className="link">Store</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="link">About</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
