import ClosingCall from "@/components/house/home/ClosingCall";
import HouseHero from "@/components/house/home/HouseHero";
import ProcessSteps from "@/components/house/home/ProcessSteps";
import PromiseNotes from "@/components/house/home/PromiseNotes";
import TakeApart from "@/components/house/home/TakeApart";
import TrustBlock from "@/components/house/home/TrustBlock";

// "Your House" homepage: the house drawing is the navigation, then the same house taken apart
// layer by layer, how a project runs, the crew promise, what we put in writing, and a last call.
export default function Home() {
  return (
    <main id="main">
      <HouseHero />
      <TakeApart />
      <ProcessSteps />
      <PromiseNotes />
      <TrustBlock />
      <ClosingCall />
    </main>
  );
}
