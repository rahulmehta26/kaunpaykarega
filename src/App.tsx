import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { Signin } from "./components/page/auth/Signin";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

function App() {

  return (

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >

      <ConvexProviderWithClerk client={convex} useAuth={useAuth} >

        <Routes>

          <Route element={<Layout />} >

            <Route path="/" />

            <Route path="/signin" element={<Signin />} />

          </Route>

        </Routes>

      </ConvexProviderWithClerk  >
    </ClerkProvider>
  )
}

export default App
