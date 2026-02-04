import MainMenu from "./MainMenu";
import SubscriptionMenu from "./SubscriptionMenu";
import YouMenu from "./Youmenu";

function ExpandedSidebar() {
  return (
    <section className="flex flex-col">
      <MainMenu />
      <SubscriptionMenu />
      <YouMenu />
    </section>
  );
}

export default ExpandedSidebar;
