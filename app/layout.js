import '@fontsource/poppins';
import "./globals.css";
import Header from "@/components/layouts/Header";
import {AppContext} from '@/context/AppContext';
import {AuthContext} from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google'

export const metadata = {
  title: "Agenda virtual",
  description: "Disfruta de tener tu agenda de forma virtual y acceder a ella en todo momento de forma sencilla.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className='scroll-smooth'>
            <body>
                <AuthContext>
                    <AppContext>
                        <GoogleOAuthProvider clientId='514866670970-5vqthbncg9sks049i6glipi8qrnd322q.apps.googleusercontent.com'>
                            <Header />
                            {children}
                        </GoogleOAuthProvider>
                    </AppContext>
                </AuthContext>
            </body>
        </html>
    );
}
