import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { NavLink } from "react-router";
import logo from "../../assets/f-logo.svg";
import { CgViewComfortable } from "react-icons/cg";
import { TbMoneybag } from "react-icons/tb";
import DropdownNavLink from "./DropdownNavLink";
import { RxCountdownTimer } from "react-icons/rx";
import { RiSettings5Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null); 

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const activeStyle = {
    borderRadius: "12px",
    width: "100%",
    backgroundColor: "#CEC1FF",
    color: "#080A29",
  };

  const savingItems = [
    { label: "Individual savings", href: "/dashboard/individual-savings" },
    { label: "Group savings", href: "/dashboard/group-savings" },
    { label: "All savings", href: "/dashboard/allsavings" },
  ];

  const assetItems = [{ label: "Portfolio", href: "/dashboard/portfolio/under-construction" }];

  const settingsItems = [
    { label: "Profile settings", href: "/dashboard/profile/under-construction" },
    { label: "Bank/Account settings", href: "/dashboard/under-construction" },
  ];

  return (
    <div className=" h-[100vh] text-textGrey hidden lg:flex md:flex flex-col bg-darker overflow-y-auto max-h-[1100px]">
      <div className="mb-20 border-b border-[#303030]">
        <img src={logo} alt="logo" className="w-[100%] p-6" />
      </div>

      <div className="px-4">
        <NavLink
          to="/dashboard"
          className="text-[16px] text-textGrey flex items-center p-4 mb-4"
          style={({ isActive }) => (isActive ? activeStyle : null)}
          end
        >
          <CgViewComfortable className="mr-2 text-[14px]" />
          Overview
        </NavLink>

        <DropdownNavLink
          label="Savings Module"
          icon={TbMoneybag}
          items={savingItems}
          activeStyle={activeStyle}
          isOpen={activeDropdown === "savings"}
          onToggle={() => toggleDropdown("savings")}
        />

        <DropdownNavLink
          label="Asset Management"
          icon={BiCategoryAlt}
          items={assetItems}
          activeStyle={activeStyle}
          isOpen={activeDropdown === "assets"}
          onToggle={() => toggleDropdown("assets")}
        />

        <NavLink
          to="/dashboard/transaction/under-construction"
          className="text-[16px] text-textGrey flex items-center p-4 mb-4"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          <RxCountdownTimer className="mr-2 text-[14px]" />
          Transaction
        </NavLink>

        <DropdownNavLink
          label="Settings"
          icon={RiSettings5Line}
          items={settingsItems}
          activeStyle={activeStyle}
          isOpen={activeDropdown === "settings"}
          onToggle={() => toggleDropdown("settings")}
        />
      </div>

      <div className="mt-auto border-t border-[#303030]">
        <button className="text-[14px] flex items-center p-4 py-6 text-red-600">
          <BiLogOut className="mr-2" size={12} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
