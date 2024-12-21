'use client'
import Image from "next/image";
import logo from "@/assets/icons/main-logo.svg";
import Link from "next/link";
import style from "./navbar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useProducts } from "@/store/productStore";
import { IoBagHandleOutline } from "react-icons/io5";
import { useCart } from "@/store/cartStore";

export default function Navbar() {
  const router = useRouter();

  const path = usePathname();

  const [ open, setOpen ] = useState( false )

  const searchResult = useProducts( state => state.searchResult )

  const handleSearch = ( value: string ) => {
    router.push( '/search-result' )

    searchResult( value )
  }

  const data = useCart( ( state ) => state.cart );

  const getAll = useCart( ( state ) => state.getAllProducts );
  useEffect( () => {
    const fetchData = async () => {

      await getAll();
    };
    fetchData();
  }, [] );

  return (
    <div>
      <div className="container">
        <div className="relative flex items-center justify-between py-5">
          <div className="flex items-center gap-2">

            <Image src={ logo } style={ { width: "60px", height: "60px" } } alt="nike-logo" />

            <div className="md:hidden">
              <FiMenu className="text-2xl cursor-pointer" onClick={ () => setOpen( true ) } />
            </div>

          </div>

          <div >
            <ul className={ `${ style.mainLinks } transition-all duration-300 flex items-center gap-5 font-semibold ${ open ? "right-0" : "-right-full" }` }>
              <IoMdClose className="md:hidden ml-auto mr-10 mb-32 -mt-32 text-2xl cursor-pointer" onClick={ () => setOpen( false ) } />

              <li>
                <Link className={ ` ${ path === '/' ? "before:w-full text-blue-400 before:bg-blue-400" : "before:w-0 before:bg-black" } ` } href={ '/' }>Home</Link>
              </li>
              <li>
                <Link className={ ` ${ path === '/products' ? "before:w-full text-blue-400 before:bg-blue-400" : "before:w-0 before:bg-black" } ` } href={ '/products' }>Shop</Link>
              </li>
              <li>
                <Link className={ ` ${ path === '/my-orders' ? "before:w-full text-blue-400 before:bg-blue-400" : "before:w-0 before:bg-black" } ` } href={ '/my-orders' }>Orders</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            {/* search bar */ }
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input onChange={ ( e ) => handleSearch( e.target.value ) } type="search" id="default-search" className="block w-fit p-2 ps-10 text-sm text-gray-900 rounded-full outline-none bg-[#F5F5F5]" placeholder="Search ..." required />
            </div>

            <Link href={ '/cart' } className="relative" >
              { data?.data?.items?.length ?
                <span className="flex items-center justify-center absolute -top-2 -right-2 bg-blue-400 text-white w-3 h-3 rounded-full text-sm p-2 ">{ data?.data?.items?.length }</span>
                : '' }
              <IoBagHandleOutline size={ 26 } className={ path === '/cart' ? "text-blue-400" : "" } />
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
