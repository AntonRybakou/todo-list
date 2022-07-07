import React from 'react';
import {Story, Meta} from '@storybook/react';
import {FullInput, FullInputPropsType} from '../components/FullInput';
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/FullInput',
    component: FullInput,
    argTypes: {
        callBack: {
            description: 'Button inside form clicked'
        }
    },
} as Meta;

const Template: Story<FullInputPropsType> = (args) => <FullInput {...args} />;

export const FullInputExample = Template.bind({});
FullInputExample.args = {
    callBack: action('Button inside form clicked')
}
