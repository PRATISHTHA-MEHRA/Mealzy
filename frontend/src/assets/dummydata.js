import { FaShippingFast, FaLeaf, FaHeart, FaBolt, FaRegClock, FaCalendarCheck, FaFire, FaUtensils } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FiUser, FiSmartphone, FiMail, FiHome } from 'react-icons/fi';
import { GiChefToque, GiFoodTruck } from 'react-icons/gi';

// Local Image Imports (Kept exactly as you provided)
import IA1 from './IA1.png';
import IA2 from './IA2.png';
import IA3 from './IA3.png';
import IA4 from './IA4.png';
import IA5 from './IA5.png';
import IA6 from './IA6.png';

import Kebab from "./Kebab.png";
import ChickenTikka from "./ChickenTikka.png";
import ChickenChargha from "./ChickenChargha.png";
import DesiChowmein from "./DesiChowmein.png";
import GulabJamun from "./GulabJamun.png";
import MasalaDosa from "./MasalaDosa.png";
import PaneerTikka from "./PannerTikka.png";
import PalakPaneer from "./PalakPaneer.png";

import BannerImage from "./BannerImage.png";
import Image1 from "./Image1.png";
import Image2 from "./Image2.png";
import Image3 from "./Image3.png";
import Image4 from "./Image4.png";
import Video from "./Video.mp4";

// --- ABOUT PAGE ---
export const features = [
    {
        id: 1,
        title: "Lightning Fast Delivery",
        text: "30-minute delivery guarantee across major cities like Delhi, Mumbai, and Bangalore.",
        icon: FaShippingFast,
        img: IA1,
    },
    {
        id: 2,
        title: "Master Indian Chefs",
        text: "Culinary experts trained at India's top hospitality institutes crafting every Mealzy dish.",
        icon: GiChefToque,
        img: IA2,
    },
    {
        id: 3,
        title: "Desi & Fresh",
        text: "100% locally sourced organic ingredients from trusted Indian farms.",
        icon: FaLeaf,
        img: IA3,
    },
];

export const stats = [
    {
        number: '10M+',
        label: 'Happy Meals',
        icon: GiFoodTruck,
        gradient: 'from-rose-500 to-rose-600',
    },
    {
        number: '98%',
        label: 'Satisfaction',
        icon: FaHeart,
        gradient: 'from-slate-700 to-slate-900',
    },
    {
        number: '150+',
        label: 'Indian Cities',
        icon: FaLeaf,
        gradient: 'from-rose-400 to-rose-500',
    },
    {
        number: '24/7',
        label: 'Support',
        icon: FaRegClock,
        gradient: 'from-slate-600 to-slate-800',
    },
];

export const teamMembers = [
    {
        name: "Chef Vikram Bhatia",
        role: "Executive Chef",
        img: IA4,
        bio: "Master of North Indian and Mughlai delicacies. Brings royal flavors to the Mealzy kitchen.",
        delay: 0.1
        
    },
    {
        name: "Chef Nehal Desai",
        role: "Head of Desserts",
        img: IA5,
        bio: "Award-winning pastry chef fusing traditional Indian sweets with modern baking techniques.",
        delay: 0.3
        
    },
    {
        name: "Chef Akash Trivedi",
        role: "Regional Cuisine Expert",
        img: IA6,
        bio: "Bringing authentic South Indian coastal flavors and traditional spice blends exclusively to Mealzy.",
        delay: 0.5
        
    },
];

// --- ABOUT HOMEPAGE ---
export const aboutfeature = [
    { icon: FaBolt, title: "Instant Ordering", text: "Seamless digital experience", color: "text-rose-500" },
    { icon: FaRegClock, title: "Always Open", text: "Midnight cravings sorted", color: "text-slate-700" },
    { icon: FaCalendarCheck, title: "Party Orders", text: "Bulk booking for events", color: "text-rose-500" },
    { icon: FaFire, title: "Desi Specials", text: "Street food made hygienic", color: "text-slate-700" }
];

// --- SPECIAL OFFER ---
export const commonTransition = "transition-all duration-300";
export const addButtonBase = "flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm";
export const addButtonHover = "hover:shadow-md active:scale-95";

// --- SPECIAL MENU ---
export const cardData = [
    { id: 1, title: 'Lucknowi Kebab', rating: 4.5, hearts: 105, description: 'Melt-in-mouth minced meat with authentic Awadhi spices', image: Kebab, popular: true, price: '₹240' },
    { id: 2, title: 'Punjabi Chicken Tikka', rating: 5.0, hearts: 155, description: 'Tender chicken marinated in spicy yogurt, roasted in tandoor', image: ChickenTikka, bestseller: true, price: '₹340' },
    { id: 3, title: 'Desi Street Chowmein', rating: 4.2, hearts: 85, description: 'Spicy Indo-Chinese noodles tossed with fresh veggies', image: DesiChowmein, price: '₹160' },
    { id: 4, title: 'Lahori Chargha', rating: 4.8, hearts: 285, description: 'Crispy golden fried whole chicken with chaat masala', image: ChickenChargha, special: true, price: '₹450' },
];

export const additionalData = [
    { id: 5, title: 'Amritsari Paneer Tikka', rating: 4.8, hearts: 210, description: 'Soft cottage cheese chunks marinated in mustard oil & spices', image: PaneerTikka, popular: true, price: '₹280' },
    { id: 6, title: 'Mysore Masala Dosa', rating: 4.5, hearts: 165, description: 'Crispy rice crepe smeared with spicy red chutney & potato filling', image: MasalaDosa, price: '₹180' },
    { id: 7, title: 'Dhaba Style Palak Paneer', rating: 4.7, hearts: 190, description: 'Creamy spinach curry cooked with fresh cottage cheese', image: PalakPaneer, price: '₹260' },
    { id: 8, title: 'Saffron Gulab Jamun', rating: 4.9, hearts: 275, description: 'Warm golden dumplings soaked in rich rose and saffron syrup', image: GulabJamun, special: true, price: '₹90' },
];

// --- FOOTER ---
export const socialIcons = [
    { icon: FaFacebook, link: '', color: '#3b5998', label: 'Facebook' },
    { icon: FaInstagram, link: '', color: '#E1306C', label: 'Instagram' },
    { icon: FaXTwitter, link: '', color: '#000', label: 'X' },
    { icon: FaYoutube, link: '', color: '#FF0000', label: 'Youtube' },
];

// --- LOGIN / FORMS ---

export const inputBase = "w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all";
export const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400";

// --- CONTACT ---
export const contactFormFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'E.g. Rohan', Icon: FiUser },
    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 888888888', pattern: "[+]{0,1}[0-9]{10,13}", Icon: FiSmartphone },
    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'rohan@example.com', Icon: FiMail },
    { label: 'Delivery Address', name: 'address', type: 'text', placeholder: 'Enter your flat/house no. and street', Icon: FiHome },
    { label: 'Favorite Dish', name: 'dish', type: 'text', placeholder: 'E.g. Kadhai Paneer', Icon: FaUtensils },
];

