import React, { FC } from 'react';
import { SectionTitle } from 'react-figma-ui';

type ContainerProps = {
    backgroundColor: string;
    children: React.ReactNode;
};

export const Chip: FC<ContainerProps> = (props) => (
    <div style={{
        display: 'inline-block',
    }}>
        <SectionTitle style={{
            height: '25px',
            padding: '0 10px',
            backgroundColor: props.backgroundColor,
            color: '#ffffff',
            borderRadius: '15px',
        }}>
            {props.children}
        </SectionTitle>
    </div>
);