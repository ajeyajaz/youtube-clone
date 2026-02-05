import MainMenu from "./MainMenu";
import SubscriptionMenu from "./SubscriptionMenu";
import YouMenu from "./Youmenu";

function ExpandedSidebar() {
  return (
    <section className="flex flex-col pl-4 pb-10 h-screen overflow-y-auto scrollbar-hide">
      <MainMenu />
      <SubscriptionMenu />
      <YouMenu />
    </section>
  );
}

export default ExpandedSidebar;
