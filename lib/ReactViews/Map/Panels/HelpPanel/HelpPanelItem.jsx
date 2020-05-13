import classNames from "classnames";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import Icon, { StyledIcon } from "../../../Icon.jsx";
import Styles from "./help-panel.scss";
import Text from "../../../../Styled/Text";
import Box from "../../../../Styled/Box";
import styled, { withTheme } from "styled-components";
import HelpVideoPanel from "./HelpVideoPanel";
import parseCustomMarkdownToReact from "../../../Custom/parseCustomMarkdownToReact";

@observer
class HelpPanelItem extends React.Component {
  static displayName = "HelpPanelItem";

  static propTypes = {
    terria: PropTypes.object.isRequired,
    viewState: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    theme: PropTypes.object,
    t: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    // const { t } = this.props;
    const MenuIconWrapper = styled(Box).attrs({
      centered: true
    })`
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      display: table-cell;
      vertical-align: middle;
      padding-left: 25px;
    `;
    const itemSelected =
      this.props.viewState.selectedHelpMenuItem === this.props.content.itemName;
    const className = classNames({
      [Styles.panelItem]: true,
      [Styles.isSelected]: itemSelected
    });

    const iconName = this.props.content.icon
      ? this.props.content.icon
      : "video";
    const reactComponents = this.props.content.markdownText
      ? parseCustomMarkdownToReact(this.props.content.markdownText).props
          .children
      : undefined;
    const title =
      reactComponents !== undefined && reactComponents.length > 0
        ? reactComponents.find(item => /(h[0-6])/i.test(item.type))?.props
            .children
        : "";
    return (
      <div
        css={`
          height: 70px;
        `}
      >
        <button
          className={className}
          onClick={() =>
            this.props.viewState.selectHelpMenuItem(this.props.content.itemName)
          }
        >
          <Box
            left
            fullHeight
            css={`
              display: table-row;
              text-align: left;
            `}
          >
            <MenuIconWrapper>
              {/* TODO: Enable overriding non-terriajs icons */}
              <StyledIcon
                styledWidth={"27px"}
                fillColor={this.props.theme.textDark}
                glyph={Icon.GLYPHS[iconName]}
              />
            </MenuIconWrapper>
            <Text
              semiBold
              extraLarge
              uppercase
              textDark
              css={`
                padding-right: 25px;
                padding-left: 5px;
                display: table-cell;
                vertical-align: middle;
                line-height: 17px;
              `}
            >
              {title}
            </Text>
          </Box>
        </button>
        <HelpVideoPanel
          terria={this.props.terria}
          viewState={this.props.viewState}
          itemString={this.props.content.itemName}
          htmlContent={reactComponents}
          videoUrl={this.props.content.videoUrl}
          placeholderImage={this.props.content.placeholderImage}
        />
      </div>
    );
  }
}

export default withTranslation()(withTheme(HelpPanelItem));
