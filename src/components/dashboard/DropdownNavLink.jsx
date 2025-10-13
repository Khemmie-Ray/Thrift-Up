import { useState } from "react";
import { NavLink } from "react-router";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { TbCircleDot } from "react-icons/tb";
import { motion } from "framer-motion";

const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0., ease: "easeInOut" },
  },
};

const DropdownNavLink = ({ label, icon: Icon, items, activeStyle, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center gap-2 mb-4 focus:outline-none w-full p-4">
        <Icon className="lg:text-white md:text-white text-wtext-white" />
        {label}
        <p className="ml-auto">
          {!isOpen ? <FaChevronDown size={12} className="hover:animate-pulse" /> : <FaChevronUp size={12} className="hover:animate-pulse" />}
        </p>
      </button>

      <motion.div className="overflow-hidden" initial="closed" animate={isOpen ? "open" : "closed"} variants={dropdownVariants}>
        {items.map((item, index) => (
          <NavLink key={index} to={item.href} style={({ isActive }) => (isActive ? activeStyle : null)} className="p-4 capitalize text-[16px] flex items-center">
            <TbCircleDot className="mr-2 hover:text-lillac" />
            {item.label}
          </NavLink>
        ))}
      </motion.div>
    </div>
  );
};

export default DropdownNavLink;