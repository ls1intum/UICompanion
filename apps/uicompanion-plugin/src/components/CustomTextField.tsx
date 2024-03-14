import {JSX, h} from "preact";
import {Bold, Link, Text, Textbox} from "@create-figma-plugin/ui";
import '!../output.css'
import {StateUpdater} from "preact/hooks";

interface CustomTextFieldProps {
    label: string
    placeholder: string
    value: string
    setValue: StateUpdater<string>
    buttonLabel?: string
    buttonLink?: string
}

const CustomTextField = (props: CustomTextFieldProps) =>  {
    function handleInput(event: JSX.TargetedEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        console.log(newValue);
        props.setValue(newValue);
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between items-center">
                <Text>
                    <Bold>{props.label}</Bold>
                </Text>
                {
                    props.buttonLink !== undefined &&
                    props.buttonLabel !== undefined &&
                    <Text>
                        <Link href={props.buttonLink} target="_blank">{props.buttonLabel}</Link>
                    </Text>
                }
            </div>
            <Textbox onInput={handleInput} placeholder={props.placeholder} value={props.value} variant="border" />
        </div>

    );
}

export default CustomTextField