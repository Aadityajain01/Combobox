import Combobox from "../components/Combobox";
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title:'Combobox',
    component: Combobox,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label1: 'Enter',
    label2: 'Exit',
  },
};

export const Primary: Story = {
  args: {
    label1: 'primary1',
    label2: 'primary2',
  },
};