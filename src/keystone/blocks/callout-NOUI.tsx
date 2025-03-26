/** @jsxRuntime classic */
/** @jsx jsx */
// import { react } from "react";
//? '@keystone-ui/core' still works even though editor throws errors
// import { jsx, useTheme } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import {
  ToolbarGroup,
  ToolbarSeparator,
} from '@keystone-6/fields-document/primitives';
import { jsx } from '@keystone-ui/core';
// import { InfoIcon } from '@keystone-ui/icons/icons/InfoIcon';
// import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
// import { AlertOctagonIcon } from '@keystone-ui/icons/icons/AlertOctagonIcon';
// import { CheckCircleIcon } from '@keystone-ui/icons/icons/CheckCircleIcon';
// import { Trash2Icon } from '@keystone-ui/icons/icons/Trash2Icon';
// import { Tooltip } from '@keystone-ui/tooltip';

const calloutIconMap = {
  info: <p>icon</p>,
  error: <p>icon</p>,
  warning: <p>icon</p>,
  success: <p>icon</p>,
  // info: InfoIcon,
  // error: AlertOctagonIcon,
  // warning: AlertTriangleIcon,
  // success: CheckCircleIcon,
};

export const callout = component({
  label: 'Callout',
  chromeless: true,
  schema: {
    intent: fields.select({
      label: 'Intent',
      options: [
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'success', label: 'Success' },
      ] as const,
      defaultValue: 'info',
    }),
    content: fields.child({
      kind: 'block',
      placeholder: '',
      formatting: 'inherit',
      dividers: 'inherit',
      links: 'inherit',
      relationships: 'inherit',
    }),
  },
  preview: function Callout(props) {
    // const { palette, radii, spacing } = useTheme();
    const intentMap = {
      info: {
        background: '#dcdcf4',
        // background: palette.blue100,
        foreground: 'blue',
        // foreground: palette.blue700,
        icon: calloutIconMap.info,
      },
      error: {
        background: '#f4dcdd',
        // background: palette.red100,
        foreground: 'red',
        // foreground: palette.red700,
        icon: calloutIconMap.error,
      },
      warning: {
        background: '#c1c1aa',
        // background: palette.yellow100,
        foreground: 'yellow',
        // foreground: palette.yellow700,
        icon: calloutIconMap.warning,
      },
      success: {
        background: '#dcf4e0',
        // background: palette.green100,
        foreground: 'green',
        // foreground: palette.green700,
        icon: calloutIconMap.success,
      },
    };
    const intentConfig = intentMap[props.fields.intent.value];

    return (
      <div
        style={{
          borderRadius: '5px',
          display: 'flex',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderLeft: `solid 5px ${intentConfig.foreground}`,
          background: intentConfig.background,
        }}
      >
        <NotEditable>
          <div
            style={{
              color: intentConfig.foreground,
              marginRight: '3px',
              marginTop: '1em',
            }}
          >
            {/* <intentConfig.icon /> */}
            <p>intentConfig.icon</p>
          </div>
        </NotEditable>
        <div style={{ flex: 1 }}>{props.fields.content.element}</div>
      </div>
    );
  },
  toolbar: function CalloutToolbar({ props, onRemove }) {
    return (
      <ToolbarGroup>
        {props.fields.intent.options.map(opt => {
          const Icon = calloutIconMap[opt.value];

          return (
            <p>toolbar</p>
          );
          // return (
          //   <Tooltip key={opt.value} content={opt.label} weight="subtle">
          //     {attrs => (
          //       <ToolbarButton
          //         isSelected={props.fields.intent.value === opt.value}
          //         onMouseDown={() => {
          //           props.fields.intent.onChange(opt.value);
          //         }}
          //         {...attrs}
          //       >
          //         <Icon size="small" />
          //       </ToolbarButton>
          //     )}
          //   </Tooltip>
          // );
        })}

        <ToolbarSeparator />

        <p>tooltip</p>
        {/* <Tooltip content="Remove" weight="subtle">
          {attrs => (
            <ToolbarButton variant="destructive" onClick={onRemove} {...attrs}>
              <Trash2Icon size="small" />
            </ToolbarButton>
          )}
        </Tooltip> */}
      </ToolbarGroup>
    );
  },
});