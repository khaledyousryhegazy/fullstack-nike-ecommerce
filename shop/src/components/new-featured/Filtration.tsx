/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useProducts } from '@/store/productStore';
import { Checkbox } from '@material-tailwind/react';
import { useEffect } from 'react';

export default function Filtration() {
  const filters = useProducts( ( state ) => state.filters );
  const setFilters = useProducts( ( state ) => state.setFilters );
  const fetchProducts = useProducts( ( state ) => state.fetchProducts );

  const handleFilters = ( value: string ) => {
    setFilters( ( prev: string[] ) => {
      if ( prev.includes( value ) ) {
        return prev.filter( ( item: string ) => item !== value );
      } else {
        return [ ...prev, value ];
      }
    } );
  };

  useEffect( () => {
    fetchProducts();
  }, [ filters, fetchProducts ] );

  return (
    <div className="flex flex-col gap-1">
      <Checkbox label="Men's" value={ "men's" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
      <Checkbox label="Women's" value={ "women's" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
      <Checkbox label="Boys" value={ "boys" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
      <Checkbox label="Girls" value={ "girls" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
      <Checkbox label="Adults" value={ "adults" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
      <Checkbox label="Children" value={ "children" } onChange={ ( e: any ) => handleFilters( e.target.value ) } />
    </div>
  );
}
