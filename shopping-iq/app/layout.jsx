import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: {
    template : '%s | Shopping-IQ',
    default : 'Shopping-IQ',
  },
  description: 'Shop the world from your home.',
  icons : {
    icon : '/images/laptop.png',
    sizes : '180x180'
  },
};

const RootLayout = ({ children }) => {

  return (
    <>
    <html lang="en">
      <body className='antialiased'>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
    </>
  );
}

export default RootLayout;