/* eslint-disable react/prop-types */
import {
  Menu,
  X,
  Home,
  Book,
  Settings,
  Clock,
  BookOpen,
  Info,
  Plus,
  PlusCircle,
} from 'lucide-react';
import { useContext } from 'react';
import { SermonContext } from '../Logic/SermonProvider';
import { PlayCircleFilled } from '@ant-design/icons';

const SideNav = ({ isCollapsed, setIsCollapsed }) => {
  const { activeTab, setActiveTab, CB } = useContext(SermonContext);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const mainItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Book, label: 'Sermons', id: 'sermons' },
    { icon: BookOpen, label: 'Message', id: 'message' },
    { icon: Clock, label: 'Recents', id: 'recents' },
    { icon: PlayCircleFilled, label: 'Media', id: 'media' },
    // { icon: Plus, label: "Media", id: "add qoute" },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: Info, label: 'About', id: 'about' },
  ];

  const NavItem = ({ item }) => (
    <button
      key={item.id}
      className={`flex items-center w-full p-4 ${
        activeTab === item.id ? 'bg-secondary' : ''
      }`}
      onClick={() => setActiveTab(item.id)}
    >
      <item.icon
        size={14}
        className={`
        ${
          CB === 0
            ? 'text-white'
            : CB === 1
            ? 'text-white'
            : CB === 2
            ? 'text-white'
            : CB === 3
            ? 'text-white'
            : CB === 4
            ? 'text-text'
            : CB === 5
            ? 'text-white'
            : ''
        } ${activeTab === 'message' && 'text-text'}
        } ${activeTab === 'sermons' && 'text-white'}
         
        `}
      />

      {!isCollapsed && <span className="ml-4">{item.label}</span>}
    </button>
  );

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-primary text-white transition-all duration-300  pt-16 z-10 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex p-4">
        <button onClick={toggleSidebar}>
          {isCollapsed ? <Menu size={14} /> : <X size={14} />}
        </button>
      </div>
      <nav className="h-full overflow-y-auto flex flex-col">
        <div>
          {mainItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
          <button onClick={() => setActiveTab("quotes")} className=" flex items-center w-full p-4  text-sm font-semibold   transition-colors duration-300">
            <PlusCircle size={15}/>
          </button>
        </div>
        <div className="mt-auto mb-14">
          {bottomItems.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
