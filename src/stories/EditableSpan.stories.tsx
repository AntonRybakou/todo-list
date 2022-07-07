import React from 'react';
import {Story, Meta} from '@storybook/react';
import {EditableSpan, EditableSpanPropsType} from '../components/EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        callBack: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    callBack: action('Value EditableSpan changed')
}
