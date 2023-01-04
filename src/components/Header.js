import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Employees", href: "/Employees" },
  { name: "Customers", href: "/Customers" },
  { name: "About Us", href: "/AboutUs" },
  { name: "Contact Us", href: "/ContactUs" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  return (
    <>
      <Disclosure as="nav" className="bg-purple-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden block rounded-full h-[100px] w-[100px]"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP-woJPcwJrC5n4DhQ3TMbanPnURcIwwC3FA&usqp=CAU"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block block rounded-full h-[100px] w-[100px"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP-woJPcwJrC5n4DhQ3TMbanPnURcIwwC3FA&usqp=CAU"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return (
                              "px-3 py-2 rounded-md text-sm font-medium no-underline text-white" +
                              (!isActive
                                ? "no-underline text-white hover:text-white hover:bg-purple-900"
                                : "no-underline bg-purple-900 text-white")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="hidden rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        "no-underline block px-3 py-2 rounded-md text-base font-medium" +
                        (!isActive
                          ? "no-underline text-white hover:text-white hover:bg-purple-900"
                          : "no-underline bg-purple-900 text-white")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-200 min-h-screen">
        <div className="max-w-7xl mx-auto pt-4">
          {props.children}
        </div>
      </div>
    </>
  );
}
