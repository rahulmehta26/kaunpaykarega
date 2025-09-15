import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { Signin } from "./components/auth/Signin";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/page/landing/Home";
import Dashboard from "./components/page/dashboard/Dashboard";
import Contact from "./components/page/contact/Contact";

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

            <Route path="/" element={<Home />} />

            <Route path="/signin" element={<Signin />} />

            <Route element={<ProtectedRoute />} >

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/groups" />
              <Route path="/person" />
              <Route path="/settlements" />

            </Route>

          </Route>

        </Routes>

      </ConvexProviderWithClerk  >
    </ClerkProvider>
  )
}

export default App
