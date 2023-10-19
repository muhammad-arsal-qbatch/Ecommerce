import SideBarGroup from '../sideBarGroup';

import './sideBar.css';

const SideBar = () => {
  const links = ['', 'ad-p', 'ad-o'];
  const text = ['Dashboard', 'Products', 'Orders'];
  return (
    <div className="main-container">
      {links.map((link, index) => (
        <SideBarGroup
        key={index}
        link={link}
        text={text[index]}
        />
      ))}
    </div>
  );
};

export default SideBar;
