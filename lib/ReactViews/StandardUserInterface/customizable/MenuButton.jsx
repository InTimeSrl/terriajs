// import React from "react";
// import classNames from "classnames";
// import Icon from "../../../Styled/Icon";
// import PropTypes from "prop-types";
// import Styles from "./menu-button.scss";

// /**
//  * Basic button for use in the menu part at the top of the map.
//  *
//  * @constructor
//  */
// function MenuButton(props) {
//   const target = props.href !== "#" ? "_blank" : undefined;
//   const rel = target === "_blank" ? "noreferrer" : undefined;
//   return (
//     <a
//       className={classNames(Styles.btnAboutLink, {
//         [Styles.aboutTweak]: props.href === "about.html"
//       })}
//       href={props.href}
//       target={target}
//       rel={rel}
//       title={props.caption}
//     >
//       {props.href !== "#" && <Icon glyph={Icon.GLYPHS.externalLink} />}
//       <span>{props.caption}</span>
//     </a>
//   );
// }

// MenuButton.defaultProps = {
//   href: "#"
// };

// MenuButton.propTypes = {
//   href: PropTypes.string,
//   caption: PropTypes.string.isRequired
// };

// export default MenuButton;
import React from "react";
import classNames from "classnames";
import Icon from "../../../Styled/Icon";
import PropTypes from "prop-types";
import Styles from "./menu-button.scss";

/**
 * Basic button for use in the menu part at the top of the map.
 *
 * @constructor
 */
function MenuButton(props) {
  const { href, caption, icon, onClick } = props;

  const target = href !== "#" ? "_blank" : undefined;
  const rel = target === "_blank" ? "noreferrer" : undefined;

  // Determine if the icon is a built-in glyph or a custom component
  const renderIcon = () => {
    if (typeof icon === "string") {
      return <Icon glyph={icon} />;
    } else if (React.isValidElement(icon)) {
      return icon;
    } else {
      return <Icon glyph={Icon.GLYPHS.externalLink} />;
    }
  };

  // Handle click event
  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault(); // Prevent default anchor behavior if onClick is provided
      onClick(event);
    }
  };

  return (
    <a
      className={classNames(Styles.btnAboutLink, {
        [Styles.aboutTweak]: href === "about.html",
      })}
      href={href}
      target={target}
      rel={rel}
      title={caption}
      onClick={handleClick} // Attach the handleClick function to the onClick event
    >
      {renderIcon()}
      <span>{caption}</span>
    </a>
  );
}

MenuButton.defaultProps = {
  href: "#",
  icon: Icon.GLYPHS.externalLink, // Default icon
  onClick: null, // Default to no-op
};

MenuButton.propTypes = {
  href: PropTypes.string,
  caption: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.string, // For built-in icons
    PropTypes.node, // For custom React components
  ]),
  onClick: PropTypes.func, // Function to handle click event
};

export default MenuButton;
