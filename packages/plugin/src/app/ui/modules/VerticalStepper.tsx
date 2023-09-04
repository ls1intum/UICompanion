import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import { Button, Type } from 'react-figma-ui';
import { Stack, StepConnector, stepConnectorClasses, styled } from '@mui/material';
import { issueStatusToIndex } from '../../models/IssueStatus';
import { Issue } from '../../models/Issue';
import { Chip, ChipDelete } from '@mui/joy';

const steps = [
    {
        label: 'Generate Frame',
        description: `Creating a frame is essential because it provides 
    a dedicated canvas for you to visualize and design your new feature. 
    UICompanion automatically handles this for you!`,
    },
    {
        label: 'Design the UI',
        description:
            `Unleash your creativity and design the perfect user interface 
      for your feature with ease and precision using the predefined 
      Artemis Design System.`,
    },
    {
        label: 'Submit mockup for review',
        description: `Streamline your review process with UICompanion. 
    The plugin automatically appends a screenshot of your mockup to 
    the respective GitHub Issue by the click of a button.`,
    },
];

const CustomConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#F0F0F0',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#F0F0F0',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#F0F0F0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

interface VerticalStepperProps {
    currentIssue: Issue;
}

export const VerticalStepper = ({ currentIssue }: VerticalStepperProps) => {
    const [activeStep, setActiveStep] = React.useState(issueStatusToIndex[currentIssue.status]);

    const handleCreate = () => {
        parent.postMessage({ pluginMessage: { type: 'create-frame', currentIssue } }, '*');  
        
        handleNext();
    }

    const handleSubmit = () => {
        parent.postMessage({ pluginMessage: { type: 'export-prototype', currentIssue } }, '*');

        handleNext();
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderActionButtons = React.useCallback((index: Number) => {
        switch (index) {
            // Generate Frame
            case 0:
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}>
                        <Button
                            tint='primary'
                            onClick={handleCreate}
                        >
                            Generate Frame
                        </Button>
                    </div>
                )

            // Design the UI
            case 1:
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}>
                        <Button
                            tint='secondary'
                            onClick={handleBack}
                        >
                            Watch Tutorial
                        </Button>
                        <Button
                            tint='primary'
                            onClick={handleNext}
                        >
                            Done
                        </Button>
                    </div>
                )

            // Submit mockup for review
            case 2:
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}>
                        <Button
                            tint='primary'
                            onClick={handleSubmit}
                        >
                            Submit Mockup
                        </Button>
                    </div>
                )

            default:
                return null;

        }
    }, [status]);

    function AvailableFrames(props) {
        const index = props.index;

        if (index === 1) {
            return (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    {currentIssue.frames
                        .map((frame: string) => (
                            <Chip
                                key={frame}
                                endDecorator={<ChipDelete />}
                                size="sm"
                            >
                                {frame}
                            </Chip>
                        ))
                    }
                </Stack>
            )
        }
    }

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} connector={<CustomConnector />} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                <Type>{step.description}</Type>
                            }
                        >
                            <Type style={{
                                color: '#333333',
                                fontSize: '14px',
                                fontWeight: 600,
                                letterSpacing: '0.13px',
                                lineHeight: '16px',
                                padding: '5px 0px',
                            }}>
                                {step.label}
                            </Type>
                        </StepLabel>
                        <StepContent sx={{ borderColor: '#F0F0F0' }}>
                            <Stack spacing={2}>
                                
                                <AvailableFrames index={index} />
                                
                                <Box>
                                    {renderActionButtons(index)}
                                </Box>
                            </Stack>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Type>All steps completed! 🎉</Type>
                </Paper>
            )}
        </Box>
    );
}