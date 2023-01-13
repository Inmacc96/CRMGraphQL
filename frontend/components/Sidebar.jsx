import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black"> CRM - Customers</p>
      </div>

      <nav className="mt-5 list-none">
        <li>
          <Link href="/" className="text-white mb-2 block">
            Customers
          </Link>
        </li>
        <li>
          <Link href="/orders" className="text-white mb-2 block">
            Orders
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
