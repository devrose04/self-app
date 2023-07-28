import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import DiscoverHome from "./pages/DiscoverHome";
import LoginDiscover from "./pages/LoginDiscover";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DiscoverDashboard from "./pages/DiscoverDashboard";
import SignUpDiscover from "./pages/SignUpDiscover";
import About from "./pages/About";
import ComingSoon from "./components/ComingSoon";
import "./styles/styles.scss";
import Personal from "./pages/Personal";
import Relationship from "./pages/Relationship";
import Career from "./pages/Career";
import MobileNavbar from "./components/MobileNavbar";
import SharingLink from "./pages/SharingLink";
import ShareCard from "./pages/ShareCard";
import WellnessDashboard from "./pages/WellnessDashboard";
import WellnessHome from "./pages/WellnessHome";
import SignUpWellness from "./pages/SignUpWellness";
import LoginWellness from "./pages/LoginWellness";
import WellnessGettingStarted from "./pages/WellnessGettingStarted";
import WellnessGettingStartedEncouraged from "./pages/WellnessGettingStartedEncouraged";
import WellnessTest from "./pages/WellnessTest";
import WellnessStoryIntro from "./pages/WellnessStoryIntro";
import WellnessDayOne from "./pages/WellnessDayOne";
import WellnessStoryTest from "./pages/WellnessStoryTest";
import WellnessStoryTimeline from "./pages/WellnessStoryTimeline";
import StoryExperience from "./pages/Wellness/StoryExperience";

// Theme
import { ThemeContext } from "./contexts/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useState } from "react";
import PageNotFound from "./pages/PageNotFound";
import EditStoryExperience from "./pages/Wellness/EditStoryExperience";
import TestDetails from "./pages/Wellness/TestDetails";


const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" ? true : false;
  const [colorMode, setColorMode] = useState('Blue');

  return (
    <>
      <ThemeContext.Provider value={{ colorMode, setColorMode }}>
        <div className={`app theme-${colorMode}`}>
          {!isHome ? <Navbar /> : ""}
          {!isHome ? <MobileNavbar /> : ""}
          <Outlet />
          {!isHome ? <Footer /> : ""}
          <ThemeToggleButton />
        </div>
      </ThemeContext.Provider>
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/discover",
        element: <DiscoverHome />,
      },
      {
        path: "discover/comingsoon",
        element: <ComingSoon />,
      },
      {
        path: "discover/about",
        element: <About />,
      },
      {
        path: "discover/signup",
        element: <SignUpDiscover />,
      },
      {
        path: "discover/login",
        element: <LoginDiscover />,
      },
      {
        path: "discover/dashboard",
        element: <DiscoverDashboard />,
      },
      {
        path: "shared-profile/:id",
        element: <SharingLink />,
      },
      {
        path: "sharing-card/:type/:id",
        element: <ShareCard />,
      },
      {
        path: "discover/personal",
        element: <Personal />,
      },
      {
        path: "discover/relationship",
        element: <Relationship />,
      },
      {
        path: "discover/career",
        element: <Career />,
      },
      {
        path: "wellness",
        element: <WellnessHome />,
      },
      {
        path: "wellness/dashboard",
        element: <WellnessDashboard />,
      },
      {
        path: "wellness/check-in",
        element: <WellnessGettingStarted />,
      },
      {
        path: "wellness/getting-started-essentials",
        element: <WellnessGettingStarted />,
      },
      {
        path: "wellness/getting-started-encouraged",
        element: <WellnessGettingStartedEncouraged />,
      },
      {
        path: "wellness/test/:testId",
        element: <WellnessTest />,
      },
      {
        path: "wellness/test-details/:testId",
        element: <TestDetails />,
      },
      {
        path: "wellness/story-test/:testId",
        element: <WellnessStoryTest />,
      },
      {
        path: "wellness/signup",
        element: <SignUpWellness />,
      },
      {
        path: "wellness/login",
        element: <LoginWellness />,
      },
      {
        path: "wellness/story-intro",
        element: <WellnessStoryIntro />,
      },
      {
        path: "wellness/story-day-one",
        element: <WellnessDayOne />,
      },
      {
        path: "wellness/story-timeline",
        element: <WellnessStoryTimeline />,
      },
      {
        path: "wellness/story-experience-form",
        element: <StoryExperience />,
      },
      {
        path: "wellness/story-experience-form/:storyId",
        element: <EditStoryExperience />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
