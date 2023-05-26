import dynamic from 'next/dynamic';


import React from "react";
import Head from "next/head";
import {NavBar} from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>99 Minutos FrontEnd Challenge</title>
        <meta name="author" content="Francisco Miranda Diaz"></meta>
        <meta name="description" content="Challange de frontend"></meta>
      </Head>
      <NavBar/>
      
      <main style={{
        padding: '0px 20px'
      }}>{children}</main>
    </>
  );
};
